# Script_gravação
#### Script de suporte para gravação em linha.
- para configurar um novo modelo deve-se:
   - criar um arquivo dentro da pasta "Produtos" com a extensão .json
   - o nome do arquivo deve ser o código effective do produto
    
- dentro deste arquivo podemos utilizar as seguintes  "tags" de configuração:
   ```
      }
         "Produto": "",                // nome do produto                            ex: "INV-YB1-06-J-H-F"
         "CodProduto": "",             // código do produto                          ex: "15141"
         "Gravador": "",               // gravador que deve ser utilizado            ex: "ST-LINK/V2"
         "Img_Gravador": "",           // imagem do gravador                         ex: ""Cyclone.png"
         "BsGravacao":"",              // base de gravação utilizada                 ex: "BGR-001"
         "SupGravacao":"",             // suporte de gravação utilizado              ex: "SGR-001"
         "Pic": "",                    // utilizado no gravador PMLAB PM3            ex: "16F916"
         "Micro":"",                   // utilizado no gravador ST-LINK              ex: "STM8S003F3"
         "Rastreamento": "",           // ratreamento habilitado                     ex: "true"
         "Tst_State": {                // maquina de estados
             "1":"SetupInicial",
             "2":"ScamGravador",
             "3":"StartRastreamento",
             "4":"GravaFirmware"
      }
      
- Dentro da pasta "Produtos" temos um modelo de configuração para cada gravador.
   -  0Model_Cyclone.json
   -  0Model_MPLAB_PM3.json
   -  0Model_Renesas.json
   -  0Model_ST.json
