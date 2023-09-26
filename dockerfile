# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in docker
WORKDIR /usr/src/app

# Copy the content of the local src directory to the working directory
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run app.py when the container launches
CMD ["python", "app.py"]

