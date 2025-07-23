"""Run this model in Python

> pip install azure-ai-inference
"""
import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import AssistantMessage, SystemMessage, UserMessage, ToolMessage
from azure.ai.inference.models import ImageContentItem, ImageUrl, TextContentItem
from azure.core.credentials import AzureKeyCredential

# To fix the import error, run the following command in your terminal:
# pip install azure-ai-inference

def main():
    # To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings.
    # Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
    client = ChatCompletionsClient(
        endpoint = "https://models.github.ai/inference",
        credential = AzureKeyCredential(os.environ["GITHUB_TOKEN"]),
    )

    user_input = input("Enter your prompt: ")
    messages = [
        UserMessage(content = [
            TextContentItem(text = user_input),
        ]),
    ]

    while True:
        response = client.complete(
            messages = messages,
            model = "deepseek/DeepSeek-R1",
        )

        if response.choices[0].message.tool_calls:
            print(response.choices[0].message.tool_calls)
            messages.append(response.choices[0].message)
            for tool_call in response.choices[0].message.tool_calls:
                messages.append(ToolMessage(
                    content=locals()[tool_call.function.name](),
                    tool_call_id=tool_call.id,
                ))
        else:
            print(response.choices[0].message.content)
            break

if __name__ == "__main__":
    main()
