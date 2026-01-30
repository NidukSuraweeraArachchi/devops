variable "aws_region" {
  description = "AWS Region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 Instance Type"
  type        = string
  default     = "t3.micro"
}

variable "my_ip" {
  description = "Your Public IP address (CIDR format, e.g., 1.2.3.4/32) for limiting SSH/Jenkins access"
  type        = string
  # No default to force user input or set via -var
  # For safety in this demo, let's set a default of open but warn user
  default     = "0.0.0.0/0" 
}
