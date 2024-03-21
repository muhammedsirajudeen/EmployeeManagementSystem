from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration, BlenderbotConfig
import torch

# Prepare dataset with conversations containing names
conversations = [
    "User: Remember these names: John, Mary, Alice, Bob, Lisa, David, Sarah, Michael, Emily, James.",
    "User: Can you recall the names? Bot: Yes, I remember: John, Mary, Alice, Bob, Lisa, David, Sarah, Michael, Emily, James.",
]

# Initialize tokenizer and model
tokenizer = BlenderbotTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
config = BlenderbotConfig.from_pretrained("facebook/blenderbot-400M-distill")
model = BlenderbotForConditionalGeneration(config=config)

# Tokenize and encode conversations
inputs = tokenizer([conv.split("User: ")[1] for conv in conversations], return_tensors="pt", padding=True, truncation=True)

# Fine-tune the model
model.train()
model(inputs.input_ids, labels=inputs.input_ids)

# Save the fine-tuned model
model.save_pretrained("./fine_tuned_model")

# Load the fine-tuned model
model = BlenderbotForConditionalGeneration.from_pretrained("./fine_tuned_model")

# Example usage to generate text
def chat_with_bot(user_input):
    inputs = tokenizer.encode("User: " + user_input, return_tensors="pt")
    reply_ids = model.generate(inputs, max_length=100)
    reply_text = tokenizer.decode(reply_ids[:, inputs.shape[-1]:][0], skip_special_tokens=True)
    return reply_text

# Example interaction
user_input = input("You: ")
response = chat_with_bot(user_input)
print("Bot:", response)
