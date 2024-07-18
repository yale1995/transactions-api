Testes Unitários: testa uma unidade da aplicação -> uma rota, um componente, uma função...
Testes de Integração: testa a comuninação entre 2 ou mais unidades
Testes e2e: simulam um usuário operando nossa aplicação

Pirâmide de testes: e2e (não dependem de nenhuma tecnologia, não dependem de arquitetura)


# Requisitos Funcionais
- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve poder obter um resumo de sua conta
- [x] O usuário deve poder listar todas as transações que ocorreram
- [x] O usuário deve poder visualizar uma transação única
  

# Requisitos NÃO Funcionais


# Regras de Negócio
- [x] Transação do tipo crédito -> O valor da transação é acrescido ao saldo atual
- [x] Transação do tipo débito -> O valor da transação é reduzido ao saldo atual
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] O usuário só pode visualizar suas próprias transações
