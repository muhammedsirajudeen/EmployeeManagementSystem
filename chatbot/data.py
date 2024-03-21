from pymongo import MongoClient

client = MongoClient("mongodb+srv://vava:vava@cluster0.vuxyl3c.mongodb.net")  # Replace with your MongoDB connection URI
def getdata():
    db = client['ems']  # Replace 'your_database' with your database name
    employeecollection = db['employees']
    departmentcollection=db['departments']

    employee_data=employeecollection.find()
    department_data=departmentcollection.find()
    employee_array=[]
    department_array=[]
    for data in employee_data:
        employee_array.append(data)
    for data in department_data:
        department_array.append(data)
    return employee_array,department_array



