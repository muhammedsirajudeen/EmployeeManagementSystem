from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
from data import getdata
import json

tokenizer = BlenderbotTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
model = BlenderbotForConditionalGeneration.from_pretrained("facebook/blenderbot-400M-distill")

employee, department = getdata()

employee_string = ""
for emp in employee:
    del emp['_id']
    del emp['DateOfJoining']
    employee_string += json.dumps(emp)

def chat_with_bot(user_input):
    # Combine context and user input
    inputs = tokenizer(user_input, return_tensors="pt")
    
    # Generate response
    reply_ids = model.generate(inputs.input_ids, max_length=1000)
    reply_text = tokenizer.decode(reply_ids[:, inputs.input_ids.shape[-1]:][0], skip_special_tokens=True)
    
    return reply_text

# Example usage
user_input = input("You: ")
response = chat_with_bot(user_input)
print("Bot:", response)
