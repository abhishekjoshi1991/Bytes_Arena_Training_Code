from flask import Flask, Blueprint, request
from flask_restx import Api, Resource, fields
from flask_restx import reqparse
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
        # import pdb; pdb.set_trace()
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
            sales_list = []
            count = 1
            for rec in filt_data:
                sales_list.append({'id': count,
                                   'name': customer,
                                   'year': rec[1],
                                   'sales_count': rec[2]})
                count += 1
        return sales_list

# for adding directly raw json body
resource_fields = api.model('Request', {
    'name': fields.String(required=True),
    'month': fields.Integer(required=False)
})

# for adding query parameter to url like :5000?name='xyz' use parser and pass in api.expect
# parser = reqparse.RequestParser()
# parser.add_argument('b', type=int, location='args')

@api.route('/sale_per_month')
class SalePerMonth(Resource):
    @api.expect(resource_fields)
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
                                   # 'yAxisID': 'y{}'.format(count)
                                   }
                prepared_list.append(prepared_values)
                count += 1
            print(prepared_list)
            return prepared_list
        else:
            return 'No data found for selected customer and month'

@api.route('/sale_all_month')
class SaleAllMonth(Resource):
    def post(self):
        customer = json.loads(request.data)
        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']],
                                     on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df, right=get_connection()[-1][['order_id', 'quantity', 'unit_price']],
                            on="order_id")
        co_od_df['revenue'] = (co_od_df.unit_price * co_od_df.quantity)
        co_od_df['order_date'] = pd.to_datetime(co_od_df['order_date'])
        co_od_df['order_date_new'] = co_od_df['order_date']
        grp_by_data = co_od_df.groupby(['customer_id', co_od_df.order_date.dt.year, co_od_df.order_date_new.dt.month.apply(lambda x: calendar.month_abbr[x])]).agg(
            overall_sales=('revenue', 'sum')).round(2).reset_index()

        # for single line chart with continued years
        if customer in grp_by_data['customer_id'].values:
            filt_data = grp_by_data[grp_by_data['customer_id'] == customer].values
            year_list = list({int(line[1]) for line in filt_data})
            year_wise_data = {}
            for line in filt_data:
                if int(line[1]) in year_wise_data.keys():
                    year_wise_data[int(line[1])].update({line[2]: int(line[-1])})
                else:
                    year_wise_data[int(line[1])] = {line[2]: int(line[-1])}
            prepared_list = []
            month_data = {}
            for year in year_list:
                months_list = []
                all_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

                for mo in all_months:
                    months_list.append(mo+str(year)[2:])
                month_data.update({month: 0 for month in months_list})
                data = year_wise_data[year]
                for rec in data:
                    month_data.update({rec+str(year)[2:]: data[rec]})
            color_1 = random.randint(0, 255)
            color_2 = random.randint(0, 255)
            color_3 = random.randint(0, 255)
            prepared_values = {'label': 'Sales Data All Year',
                                'data': month_data,
                                'borderColor': 'rgb({}, {}, {})'.format(color_1, color_2, color_3),
                                }
            prepared_list.append(prepared_values)
            print('$$$$$$$$', prepared_list)
            return prepared_list
        else:
            return 'No data found for selected customer'

        # for multiple line chart as per year

        # for year in year_list:
        #     months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        #     month_data = {month: 0 for month in months_list}
        #     data = year_wise_data[year]
        #     for rec in data:
        #         month_data.update({rec: data[rec]})
        #     color_1 = random.randint(0, 255)
        #     color_2 = random.randint(0, 255)
        #     color_3 = random.randint(0, 255)
        #     prepared_values = {'label': year,
        #                        'data': month_data,
        #                        'borderColor': 'rgb({}, {}, {})'.format(color_1, color_2, color_3),
        #                        # 'yAxisID': 'y{}'.format(count)
        #                        }
        #     prepared_list.append(prepared_values)
        #     count += 1
        # print(prepared_list)
        # return prepared_list
        # else:
        #     return 'No data found for selected customer'


@api.route('/sale_all_month_pie')
class SaleAllMonthPie(Resource):
    def post(self):
        customer = json.loads(request.data)
        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']],
                                     on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df,
                            right=get_connection()[-1][['order_id', 'quantity', 'unit_price']],
                            on="order_id")
        co_od_df['revenue'] = (co_od_df.unit_price * co_od_df.quantity)
        co_od_df['order_date'] = pd.to_datetime(co_od_df['order_date'])
        co_od_df['order_date_new'] = co_od_df['order_date']
        grp_by_data = co_od_df.groupby(['customer_id', co_od_df.order_date.dt.year,
                                        co_od_df.order_date_new.dt.month.apply(
                                            lambda x: calendar.month_abbr[x])]).agg(
            overall_sales=('revenue', 'sum')).round(2).reset_index()

        # for pie chart
        if customer in grp_by_data['customer_id'].values:
            filt_data = grp_by_data[grp_by_data['customer_id'] == customer].values
            year_list = list({int(line[1]) for line in filt_data})
            year_wise_data = {}
            for line in filt_data:
                if int(line[1]) in year_wise_data.keys():
                    year_wise_data[int(line[1])].update({line[2]: int(line[-1])})
                else:
                    year_wise_data[int(line[1])] = {line[2]: int(line[-1])}
            month_data = {}
            for year in year_list:
                months_list = []
                all_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
                              'Dec']

                for mo in all_months:
                    months_list.append(mo + str(year)[2:])
                month_data.update({month: 0 for month in months_list})
                data = year_wise_data[year]
                for rec in data:
                    month_data.update({rec + str(year)[2:]: data[rec]})

            final_data = []
            count = 1
            for record in month_data:
                color_1 = random.randint(0, 255)
                color_2 = random.randint(0, 255)
                color_3 = random.randint(0, 255)
                if month_data[record] > 0:
                    final_data.append({
                        'id': count,
                        'month': record,
                        'sale': month_data[record],
                        'color': 'rgb({},{},{})'.format(color_1, color_2, color_3)
                    })
                count += 1
            return final_data
        else:
            return 'No data found for selected customer'

@api.route('/categwise_prod_count')
class CategoryWiseProductCount(Resource):
    def get(self):
        # import pdb; pdb.set_trace()
        pro_categ_df = pd.merge(left=get_connection()[1]['category_id'], right=get_connection()[3][['category_id', 'category_name']],
                                on="category_id", how='inner')
        pro_categ_df['count'] = 1
        product_count_df = pro_categ_df.groupby(['category_name']).sum('category_name').reset_index()[['category_name','count']]
        product_count_list = []
        for rec in product_count_df.values:
            product_count_list.append({'category': rec[0],
                                       'count': rec[1]
                                       })
        return product_count_list

@api.route('/cust_categ_wise_unit_sold')
class CategoryWiseProductCount(Resource):
    def post(self):
        # import pdb; pdb.set_trace()
        customer = json.loads(request.data)
        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']],
                                     on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df,
                            right=get_connection()[-1][['order_id','product_id', 'quantity', 'unit_price']],
                            on="order_id")
        co_od_prod_df = pd.merge(left=co_od_df, right=get_connection()[1][['product_id', 'category_id']],
                                 on='product_id')
        co_od_prod_categ_df = pd.merge(left=co_od_prod_df, right=get_connection()[3][['category_id', 'category_name']],
                                       on='category_id')
        filt_data = co_od_prod_categ_df['customer_id'] == customer
        filtered_df = co_od_prod_categ_df[filt_data]

        grp_by_result = filtered_df.groupby(['category_name']).sum().reset_index()[['category_name','quantity']]
        # if grp_by_result:
        categ_product_qunatity_sold = []

        for result in grp_by_result.values:
            categ_product_qunatity_sold.append({
                'category': result[0],
                'quantity': result[1],
                'offset': 50
            })

        print(categ_product_qunatity_sold)
        return categ_product_qunatity_sold



@api.route('/bar_sale_all_year')
class SaleAllMonth(Resource):
    def post(self):

        customer = json.loads(request.data)
        customer_order_df = pd.merge(left=get_connection()[0]['customer_id'],
                                     right=get_connection()[2][['customer_id', 'order_id', 'order_date']],
                                     on="customer_id",
                                     how='inner')
        co_od_df = pd.merge(left=customer_order_df, right=get_connection()[-1][['order_id', 'quantity', 'unit_price']],
                            on="order_id")
        co_od_df['revenue'] = (co_od_df.unit_price * co_od_df.quantity)
        co_od_df['order_date'] = pd.to_datetime(co_od_df['order_date'])
        co_od_df['order_date_new'] = co_od_df['order_date']
        grp_by_data = co_od_df.groupby(['customer_id', co_od_df.order_date.dt.year, co_od_df.order_date_new.dt.month.apply(lambda x: calendar.month_name[x])]).agg(
            overall_sales=('revenue', 'sum')).round(2).reset_index()

        # import pdb; pdb.set_trace()
        # for single line chart with continued years
        if customer in grp_by_data['customer_id'].values:
            filt_data = grp_by_data[grp_by_data['customer_id'] == customer].values
            year_list = list({int(line[1]) for line in filt_data})
            year_wise_data = {}
            for line in filt_data:
                if int(line[1]) in year_wise_data.keys():
                    year_wise_data[int(line[1])].update({line[2]: int(line[-1])})
                else:
                    year_wise_data[int(line[1])] = {line[2]: int(line[-1])}
            print(year_wise_data)
            dataset = []
            months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December']
            for year in year_wise_data:
                vals = []
                for month in months_list:
                    if month in year_wise_data[year]:
                        vals.append(year_wise_data[year][month])
                    else:
                        vals.append('')
                color_1 = random.randint(0, 255)
                color_2 = random.randint(0, 255)
                color_3 = random.randint(0, 255)
                dataset_dict = {
                    'label': year,
                    'data': vals,
                    'backgroundColor': 'rgb({}, {}, {})'.format(color_1, color_2, color_3)
                }
                dataset.append(dataset_dict)
            print(dataset)
            return dataset
        #     prepared_list = []
        #     month_data = {}
        #     for year in year_list:
        #         months_list = []
        #         all_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        #
        #         for mo in all_months:
        #             months_list.append(mo+str(year)[2:])
        #         month_data.update({month: 0 for month in months_list})
        #         data = year_wise_data[year]
        #         for rec in data:
        #             month_data.update({rec+str(year)[2:]: data[rec]})
        #     color_1 = random.randint(0, 255)
        #     color_2 = random.randint(0, 255)
        #     color_3 = random.randint(0, 255)
        #     prepared_values = {'label': 'Sales Data All Year',
        #                         'data': month_data,
        #                         'borderColor': 'rgb({}, {}, {})'.format(color_1, color_2, color_3),
        #                         }
        #     prepared_list.append(prepared_values)
        #     return prepared_list
        # else:
        #     return 'No data found for selected customer'



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
    query_category = "Select * from categories;"
    query_orders = "Select * from orders;"
    query_orders_details = "Select * from order_details;"
    customer_df = pd.DataFrame(conn.execute(text(query_customer)).fetchall())
    product_df = pd.DataFrame(conn.execute(text(query_product)).fetchall())
    orders_df = pd.DataFrame(conn.execute(text(query_orders)).fetchall())
    order_details_df = pd.DataFrame(conn.execute(text(query_orders_details)).fetchall())
    category_df = pd.DataFrame(conn.execute(text(query_category)).fetchall())
    return customer_df, product_df, orders_df, category_df, order_details_df


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)