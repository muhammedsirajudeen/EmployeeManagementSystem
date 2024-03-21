from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
from data import getdata
import json

app = Flask(__name__)
CORS(app)  # Add CORS support to your Flask app

# Load the model and tokenizer
tokenizer = BlenderbotTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
model = BlenderbotForConditionalGeneration.from_pretrained("facebook/blenderbot-400M-distill")

# Load data
employee, department = getdata()
employee_string = ""
for emp in employee:
    del emp['_id']
    del emp['DateOfJoining']
    employee_string += json.dumps(emp)

# Define chat function
def chat_with_bot(user_input):
    # Combine context and user input
    inputs = tokenizer(user_input, return_tensors="pt")
    
    # Generate response
    reply_ids = model.generate(inputs.input_ids, max_length=1000)
    reply_text = tokenizer.decode(reply_ids[:, inputs.input_ids.shape[-1]:][0], skip_special_tokens=True)
    
    return reply_text

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data['user_input']
    response = chat_with_bot(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
