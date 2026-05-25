interface BankStructure{

    id_sessao: string;
    data_hora: string;
    usuario: string;
    message: string;

};

interface MessageParams{

    User: BankStructure;
    MessageUser: boolean; 

};