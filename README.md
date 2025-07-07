# FlipCoin – Application Code & CI/CD Pipeline

This repository contains the application code and the complete GitHub Actions-based CI/CD pipeline for **FlipCoin**, a lightweight web app deployed on a Kubernetes cluster using GitOps and DevSecOps practices.

---

## 📌 Problem Statement

The objective was to build a secure, scalable, and automated delivery pipeline for a cloud-native app deployed via Kubernetes. The pipeline needed to:

- Automatically build and push Docker images to ECR
- Scan container images for vulnerabilities
- Update the GitOps environment with new image tags
- Trigger Argo CD to sync deployments automatically

We aimed to implement this with full **OIDC-based role assumption** (no long-lived AWS secrets), **Trivy vulnerability scanning**, and **GitOps integration** for deployment.

---

## ⚙️ CI/CD Workflow Highlights

- **Trigger**: Runs on every push to the `main` branch (except README-only changes)
- **OIDC Authentication**: Uses `configure-aws-credentials@v2` to assume an IAM role without AWS secrets
- **Build**: Docker image is built using the short commit SHA as the tag
- **Security Scan**: Runs [Trivy](https://github.com/aquasecurity/trivy) to scan for OS and library vulnerabilities
- **Push**: Uploads the image to AWS ECR
- **GitOps Integration**: Clones the `gitops-environments` repo, updates the image tag in `dev/flipcoin/deployment.yaml`, and pushes it—triggering an Argo CD auto-sync

---

## 🛠️ Challenges Faced

- Integrating **OIDC authentication** with GitHub Actions securely (no static credentials)
- Ensuring **Trivy scans** didn't break builds unnecessarily but still surfaced issues
- Avoiding **Argo CD sync loops** by limiting what changes trigger the workflow
- Managing safe, minimal updates to the `deployment.yaml` file in the GitOps repo using shell commands
- Keeping CI/CD logic fully decoupled from Kubernetes deployment logic

---

## ✅ Outcome

- Docker image is built, scanned, and pushed automatically to **Amazon ECR**
- Argo CD is notified via GitOps-style update to the manifest repo
- No manual steps or local tools required—fully cloud-native and secure
- Workflow is extendable for future enhancements (e.g., Slack notifications, Helm charts, or image signing)

---

## 🔗 Related Repositories

- 🔧 [Terraform Infrastructure Repository](https://github.com/RESTfulAyush/infra-gitops-devsecops.git)
- 📦 [GitOps Environments Repository](https://github.com/RESTfulAyush/gitops-environments.git)
