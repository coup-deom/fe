#!/bin/bash

sudo cp ./.zshrc-extend /root/.zshrc-extend
cp ./.zshrc-extend /home/node/.zshrc-extend

source ~/.zshrc

# as a root
gpg --version
gpgconf --launch gpg-agent
mise trust ../mise.toml
mise settings experimental=true

# as a node
sudo -u node mise trust ../mise.toml
sudo -u node mise settings experimental=true


