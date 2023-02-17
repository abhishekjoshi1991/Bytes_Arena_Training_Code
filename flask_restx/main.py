from flask import Flask, Blueprint, request
from flask_restx import Api, Resource
from flask_cors import CORS, cross_origin
import mysql.connector as connection
import pandas as pd

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
            sales_dict = []
            count = 1
            for rec in filt_data:
                sales_dict.append({'id': count,
                                   'name': customer,
                                   'year': rec[1],
                                   'sales_count': rec[2]})
                count += 1
        return sales_dict


def get_connection():
    mydb = connection.connect(host="localhost", database ='p',user="abhishek", passwd="abhishek",use_pure=True)
    query_customer = "Select * from customers;"
    query_product = "Select * from products;"
    query_orders = "Select * from orders;"
    query_orders_details = "Select * from order_details;"

    customer_df = pd.read_sql(query_customer,mydb)
    product_df = pd.read_sql(query_product,mydb)
    orders_df = pd.read_sql(query_orders,mydb)
    order_details_df = pd.read_sql(query_orders_details,mydb)

    return customer_df, product_df, orders_df, order_details_df


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)