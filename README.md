Bake-a-pi


##### Table of Contents  
[Prepare Pi](#prepare-pi)  
[Install K3s server](#install-k3s-server)  
[Fun with kubectl](#fun-with-kubectl)  
[Install K3s worker nodes](#install-k3s-worker-nodes)  
[Docker Build for multi architecture](#docker-build-for-multi-architecture)   
[Configure Cert-Manager](#configure-cert-manager)  


## Prepare Pi

[![Raspberry Pi K3s Prep](https://img.youtube.com/vi/KZCPOKABuNQ/0.jpg)](https://www.youtube.com/watch?v=KZCPOKABuNQ)

### Enable SSH:
```
touch ssh
```

### Enable Container


 Add  `cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory` to /boot/cmdline.txt
 And update DHCP settings

```
sudo vi /boot/cmdline.txt
sudo nano /etc/dhcpcd.conf
```

## Install K3s Server

K3s Docs
https://github.com/k3s-io/k3s

K3s - quick start guide:

https://rancher.com/docs/k3s/latest/en/quick-start/

### Install Script

Run the following script on your Pi
```
curl -sfL https://get.k3s.io | sh -

```

After the install completes there will be a few things you will need later in the install.


First run the command below and put somewhere as you will need it if setting up worker nodes. This will be your `K3S_TOKEN`

```
sudo cat /var/lib/rancher/k3s/server/node-token
```

Next in order to run kubectl commands from your local machine you will need the kube config.

```
sudo cat /etc/rancher/k3s/k3s.yaml
```

If you need to install `kubectl` on your local machine you can find instructions here: https://kubernetes.io/docs/tasks/tools/

Copy output from `/etc/rancher/k3s/k3s.yaml` to `~/.kube/config` Update `127.0.0.1` to Master Ip Address

```
vi ~/.kube/config
```

### Fun with kubectl
https://ahmet.im/blog/kubectl-aliases/

```
kgpon kube-system
```


### Install K3s worker nodes

Get K3S_TOKEN from Pi:
```
sudo cat /var/lib/rancher/k3s/server/node-token
```

Replace `K3S_URL` with the server address
```
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
``` 


## Docker Build for multi architecture
```
docker buildx create --name mybuilder
docker buildx use mybuilder 
```

Build Examples:

```
docker build  -t blueguse/rpi-node-sample:0.0.3 .
```

Build Push Multi-Architecture Example:
```
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t  blueguse/rpi-node-sample:0.0.3 --push  .
```
## Configure Cert-Manager
https://opensource.com/article/20/3/ssl-letsencrypt-k3s


```
kubectl apply -f cert-manager/cert-manager-arm.yaml
```

Configure your cluster issuer, this will be different on your domain registrar.

There is many different options to configure your ACME (Automated Certificate Management Environment)

https://cert-manager.io/docs/configuration/acme/

```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  annotations:
  name: letsencrypt-prod
  namespace: cert-manager
spec:
  acme:
    email: <MY_EMAIL>
    preferredChain: ""
    privateKeySecretRef:
      name: letsencrypt-prod
    server: https://acme-v02.api.letsencrypt.org/directory
    solvers:
    - dns01:
        route53:
          accessKeyID: <MY_ACCESS_KEY>
          region: us-east-1
          secretAccessKeySecretRef:
            key: secret-access-key
            name: prod-route53-credentials-secret
      selector:
        dnsZones:
        - spunkyrocket.com
```