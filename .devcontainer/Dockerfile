FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm
# Install the xz-utils package
RUN apt-get update && apt-get install -y xz-utils

RUN apt-get install -y bat tre-command neovim wget sudo curl

USER root
RUN sudo passwd -d root
RUN sudo passwd -d node

RUN sudo chsh -s /bin/zsh root
RUN sudo chsh -s /bin/zsh node

RUN sudo apt update -y && sudo apt install -y gpg sudo wget curl
RUN sudo install -dm 755 /etc/apt/keyrings
RUN wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor | sudo tee /etc/apt/keyrings/mise-archive-keyring.gpg 1> /dev/null
RUN echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" | sudo tee /etc/apt/sources.list.d/mise.list
RUN sudo apt update && sudo apt install -y mise

RUN echo '\neval "$(mise activate zsh)"\n' >> ~/.zshrc
RUN echo '\neval "$(mise hook-env -s zsh)"\n' >> ~/.zshrc
RUN echo "\nif [ -f ~/.zshrc-extend ]; then\n    . ~/.zshrc-extend\nfi\n" >> ~/.zshrc


USER node
RUN echo '\neval "$(mise activate zsh)"\n' >> ~/.zshrc
RUN echo '\neval "$(mise hook-env -s zsh)"\n' >> ~/.zshrc
RUN echo "\nif [ -f ~/.zshrc-extend ]; then\n    . ~/.zshrc-extend\nfi\n" >> ~/.zshrc
