# Import existing VPC by name
data "aws_vpc" "selected" {
  filter {
    name   = "tag:Name"
    values = [var.vpc_name]
  }
}

# Find existing subnet by name (pegar via remote?)
data "aws_subnet" "selected" {
  filter {
    name   = "tag:Name"
    values = [var.subnet_name]
  }
  
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.selected.id]
  }
}

# Import the latest AMI with name starting with "veecode-base-*"
data "aws_ami" "veecode_saas" {
  most_recent = true
  owners      = ["self"]
  
  filter {
    name   = "name"
    values = ["veecode-saas-*"]
  }
  
  filter {
    name   = "state"
    values = ["available"]
  }
}

# Create Graviton EC2 instance using the imported AMI
resource "aws_instance" "mycp" {
  ami                    = data.aws_ami.veecode_saas.id
  instance_type          = var.instance_type
  key_name               = tolist(var.key_names)[0] # Using the first key in the set for initial SSH access
  subnet_id              = data.aws_subnet.selected.id
  #vpc_security_group_ids = [data.aws_security_group.selected.id]

{% if values.useSpotInstance %}
  # Use spot instance for cost optimization
  instance_market_options {
    market_type = "spot"
  }
{% endif %}
  
  root_block_device {
    volume_size = 50
    volume_type = "gp3"
    encrypted   = true
  }

  # Use user_data to add all public keys to authorized_keys
  user_data = <<-EOF
    #!/bin/bash
    # Ensure .ssh directory exists with correct permissions
    mkdir -p /home/ec2-user/.ssh
    chmod 700 /home/ec2-user/.ssh
    
    # Add all public keys to authorized_keys file
    cat > /home/ec2-user/.ssh/authorized_keys <<EOT
${join("\n", [for key in data.aws_key_pair.keys : key.public_key])}
EOT
    
    # Set correct permissions
    chmod 600 /home/ec2-user/.ssh/authorized_keys
    chown -R ec2-user:ec2-user /home/ec2-user/.ssh
  EOF

  tags = {
    Name = var.instance_name
  }
}