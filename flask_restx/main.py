from flask import Flask, Blueprint, request
from flask_restx import Api, Resource
from flask_cors import CORS, cross_origin
import mysql.connector as connection
import pandas as pd
import json
import datetime, calendar
import random
from sqlalchemy import create_engine
from sqlalchemy import text

app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api')

# api = Api(app)
api = Api(blueprint)
app.register_blueprint(blueprint)


cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

@api.route("/hello")
# @cross_origin()
class HelloWorld(Resource):
    def get(self):
        return {'message': 'Hello world'}

@api.route('/customers')
class Customer(Resource):
    def get(self):
        cust_df = get_connection()[0]
        return {'data': cust_df['customer_id'].tolist(), 'count': len(cust_df['customer_id'].tolist())}


@api.route('/customer_sale')
class CustomerSale(Resource):
    def post(self):
        customer = request.data.decode().strip('"')
        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']], on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df, right=get_connection()[-1][['order_id', 'quantity']], on="order_id")
        co_od_df['order_date'] = pd.to_datetime(co_od_df['order_date'])
        customer_year_wise_sale = co_od_df.groupby(['customer_id', co_od_df.order_date.dt.year]).agg(overall_sales=('quantity' , 'sum')).reset_index()

        if customer in customer_year_wise_sale['customer_id'].values:
            filt_data = customer_year_wise_sale[customer_year_wise_sale['customer_id'] == customer].values
            sales_dict = []
            count = 1
            for rec in filt_data:
                sales_dict.append({'id': count,
                                   'name': customer,
                                   'year': rec[1],
                                   'sales_count': rec[2]})
                count += 1
        return sales_dict

@api.route('/sale_per_month')
class SalePerMonth(Resource):
    def post(self):
        form_data = json.loads(request.data)
        customer = form_data['name']
        month = int(form_data['month'])

        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']],
                                     on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df, right=get_connection()[-1][['order_id', 'quantity', 'unit_price']], on="order_id")
        co_od_df['revenue'] = (co_od_df.unit_price * co_od_df.quantity)
        co_od_df['order_date'] = pd.to_datetime(co_od_df['order_date'])
        co_od_df['order_date_new'] = co_od_df['order_date']
        grp_by_data = co_od_df.groupby(['customer_id', co_od_df.order_date.dt.year, co_od_df.order_date_new]).agg(overall_sales=('revenue', 'sum')).round(2).reset_index()
        data_sp_month = grp_by_data[grp_by_data['order_date_new'].dt.month == month]

        if customer in data_sp_month['customer_id'].values:
            filt_data = data_sp_month[data_sp_month['customer_id'] == customer].values
            print('*******************',filt_data)
            year_list = list({int(line[1]) for line in filt_data})
            year_wise_data = {}
            for line in filt_data:
                if int(line[1]) in year_wise_data.keys():
                    year_wise_data[int(line[1])].update({line[2].date().strftime('%d/%m'): int(line[-1])})
                else:
                    year_wise_data[int(line[1])] = {line[2].date().strftime('%d/%m'): int(line[-1])}
            print('------------------->',year_wise_data)
            prepared_list = []
            count = 1
            for year in year_list:
                num_days = calendar.monthrange(year, month)[1]
                days = {datetime.date(year, month, day).strftime('%d/%m'): 0 for day in range(1, num_days + 1)}
                data = year_wise_data[year]
                for date in data:
                    days.update({date: data[date]})
                color_1 = random.randint(0, 255)
                color_2 = random.randint(0, 255)
                color_3 = random.randint(0, 255)
                prepared_values = {'label': year,
                                   'data': days,
                                   'borderColor': 'rgb({}, {}, {})'.format(color_1, color_2, color_3),
                                   'yAxisID': 'y{}'.format(count)
                                   }
                prepared_list.append(prepared_values)
                count += 1
            print(prepared_list)
            return prepared_list



@api.route('/productstock')
class ProductStock(Resource):
    def get(self):
        product_df = get_connection()[1]
        pro_qty_df = product_df[['product_name','units_in_stock']]
        prod_qty_res = []
        count = 1
        for name, qty in pro_qty_df.values:
            prod_qty_res.append({'id':count,
                                 'product': name,
                                 'quantity': qty})
        return prod_qty_res

def get_connection():
    # mydb = connection.connect(host="localhost", database ='p',user="abhishek", passwd="abhishek",use_pure=True)
    # query_customer = "Select * from customers;"
    # query_product = "Select * from products;"
    # query_orders = "Select * from orders;"
    # query_orders_details = "Select * from order_details;"
    #
    # customer_df = pd.read_sql(query_customer,mydb)
    # product_df = pd.read_sql(query_product,mydb)
    # orders_df = pd.read_sql(query_orders,mydb)
    # order_details_df = pd.read_sql(query_orders_details,mydb)
    #
    # return customer_df, product_df, orders_df, order_details_df
    engine = create_engine("mysql+pymysql://abhishek:abhishek@localhost/p")
    conn = engine.connect()
    query_customer = "SELECT * FROM customers;"
    query_product = "Select * from products;"
    query_orders = "Select * from orders;"
    query_orders_details = "Select * from order_details;"
    customer_df = pd.DataFrame(conn.execute(text(query_customer)).fetchall())
    product_df = pd.DataFrame(conn.execute(text(query_product)).fetchall())
    orders_df = pd.DataFrame(conn.execute(text(query_orders)).fetchall())
    order_details_df = pd.DataFrame(conn.execute(text(query_orders_details)).fetchall())
    return customer_df, product_df, orders_df, order_details_df


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)