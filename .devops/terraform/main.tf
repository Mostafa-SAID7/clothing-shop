terraform {
  required_version = ">= 1.0"
  
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket = "clothing-shop-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

module "clothing_shop" {
  source = "./modules/app"
  
  environment = var.environment
  replicas    = var.replicas
  image_tag   = var.image_tag
}
