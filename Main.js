class Main {
    constructor() {

        // this.Map = ["GRAVACAO", "TF"]
        // this.Evt = "GRAVACAO"
        // this.indTest = 0
        // this.stateMachine = null
        // this.timeInterval = 300
        // this.ConfigTest = null
        // this.Falhas = new Map()
        // this.TestStatus = new Map()
         this.ui = new UI()
         this.ApiAudio = new ApiAudio()
        // this.rastAPI = new RastAPI(this)
        // this.MaquinaDeEstados("opScam")
    }

    // MaquinaDeEstados(state) {
    //     switch (state) {
    //         case "opScam":
    //             this.SetState("### Scam Code ###")
    //             if (this.rastAPI.isFirstExec() || sessionStorage.getItem("codProduto") == null) {
    //                 sessionStorage.clear()
    //                 this.ui.setMsg("Informe o número da Ordem de Produção do produto")
    //                 BarcodeScanner(this.ui.video, (value) => {
    //                     //const nsRgx = /[1][0]{5,6}\d{7}/
    //                     const opRgx = /[o|O][p|P][a-zA-Z]?[a-zA-Z]?[[a-zA-Z]?[-][0-9]{1,7}[-][0-1]/
    //                     if (value.includes("Camera não encontrada")) {
    //                         console.log("Camera não encontrada");

    //                         this.ui.getInsertedValue("Informe o numero da OP", (value) => {
    //                             if (value != null && value.match(opRgx) != null) {
    //                                 console.log(value)
    //                                 sessionStorage.setItem("OP", value);
    //                                 this.rastAPI.requestERP("OP", () => {
    //                                     this.ui.setMsg("")
    //                                     this.ConfiguraTest(sessionStorage.getItem("codProduto"))
    //                                 })
    //                             }
    //                             else {
    //                                 console.log("Cod de Inválido");
    //                                 this.Falhas.set("Erro", "Op Inválida")
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             }
    //                         })
    //                     } else {
    //                         if (value.match(opRgx) != null) {
    //                             console.log(value)
    //                             sessionStorage.setItem("OP", value);
    //                             this.rastAPI.requestERP("OP", () => {
    //                                 this.ui.setMsg("")
    //                                 this.ConfiguraTest(sessionStorage.getItem("codProduto"))
    //                             })
    //                         }
    //                         else {
    //                             console.log("Cod de Inválido");
    //                             this.MaquinaDeEstados("FinalizaTeste")
    //                         }
    //                     }


    //                 })
    //             } else {
    //                 this.ui.setMsg("")
    //                 this.ConfiguraTest(sessionStorage.getItem("codProduto"))
    //             }

    //             break
    //         case "SetupInicial":
    //             this.SetState("### SetupInicial ###")
    //             this.ui.setMsg("")
    //             this.TestStatus.set("Firmware Gravado",sessionStorage.getItem("Firmware"))
    //             this.ui.setTitle(sessionStorage.getItem("Produto"))
    //             if (this.rastAPI.isFirstExec()) {
    //                 if(this.ConfigTest.Gravador == "Cyclone"){
    //                     this.ui.modalInfo("Imagens/" + this.ConfigTest.Img_Gravador, "Para prosseguir utilize: o Gravador " + 
    //                     this.ConfigTest.Gravador+
    //                     "\n\ncopie o caminho: \n\n "+ sessionStorage.getItem("Firmware")+"\n\n Após o commit fechar o 'Cyclone Image Management'", () => {
    //                         this.SetState("Next")
    //                         setTimeout(() => {
    //                             pvi.runInstructionS("EXEC", ["C:/PEMicro/cyclone_pro/ManageImages.exe", "", "false", "true"])                                
    //                         },2000);    
    //                     })
    //                 } 
    //                 else{
    //                     this.ui.modalInfo("Imagens/" + this.ConfigTest.Img_Gravador, ("Para prosseguir utilize:\n Gravador " + this.ConfigTest.Gravador)  + 
    //                     (this.ConfigTest.BsGravacao == "NA" || this.ConfigTest.BsGravacao == undefined ? "" :"\n Base de gravação "+ this.ConfigTest.BsGravacao) + 
    //                     (this.ConfigTest.SupGravacao == "NA" || this.ConfigTest.SupGravacao == undefined ? "" :"\n Suporte de gravação "+ this.ConfigTest.SupGravacao) , () => {
    //                         this.SetState("Next")
    
    //                     })
    //                 }
    //             } else {
    //                  this.SetState("Next")
    //              }
    //             break
    //         case "ScamGravador":
    //             if (this.rastAPI.isFirstExec() || sessionStorage.getItem("codGravador") == null) {
    //                 this.ui.closeImage()
    //                 this.ui.setMsg("Informe o número do gravador que será Utilizado.")
    //                 setTimeout(() => {
    //                     BarcodeScanner(this.ui.video, (value) => {
    //                         const opRgx = /[G|g][R|r][-][0-9]{1,4}/
    //                         if (value.includes("Camera não encontrada")) {
    //                             console.log("Camera não encontrada");

    //                             this.ui.getInsertedValue("Informe o número do gravador que será Utilizado.", (value) => {
    //                                 if (value.match(opRgx) != null) {
    //                                     console.log(value)
    //                                     sessionStorage.setItem("codGravador", value);
    //                                     this.TestStatus.set("Gravador", value)
    //                                     this.SetState("Next")

    //                                 }
    //                                 else {
    //                                     console.log("Cod de Gravador Inválido");
    //                                     this.Falhas.set("Erro", "Cod Gravador Inválido")
    //                                     this.MaquinaDeEstados("FinalizaTeste")
    //                                 }
    //                             })
    //                         } else {
    //                             if (value.match(opRgx) != null) {
    //                                 console.log(value)
    //                                 sessionStorage.setItem("codGravador", value);
    //                                 TestStatus.set("Gravador", value)
    //                                 this.SetState("Next")
    //                             }
    //                             else {
    //                                 console.log("Cod de Gravador Inválido");
    //                                 this.Falhas.set("Erro", "Cod Gravador Inválido")
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             }
    //                         }


    //                     })
    //                 }, 2000);
    //             } else {
    //                 this.ui.setMsg("")
    //                 this.ConfiguraTest(sessionStorage.getItem("codProduto"))
    //             }


    //             break
    //         case "StartRastreamento":
    //             this.SetState("### Rastreamento ###")
    //             if (this.ConfigTest.Rastreamento == "true") {

    //                 this.rastAPI.init(() => {
    //                     this.rastAPI.start((value, resp) => {
    //                         if (value) {
    //                             this.SetState("Next")
    //                         } else {
    //                             this.Falhas.set("Rastreamento", resp)
    //                             this.MaquinaDeEstados("FinalizaTeste")
    //                         }
    //                         console.log(value, resp)
    //                     })

    //                 })


    //             } else {
    //                 this.SetState("Next")
    //             }
    //             break
    //         case "GravaFirmware":
    //             this.ui.setMsg("Coloque a ponteirado gravador no local de gravação e clique em avança")
    //             this.ui.observerAvanca((value) => {
    //                 if (value) {
    //                     this.ui.setMsg("Gravando Firmware Aguarde...")
    //                     if (this.ConfigTest.Gravador == "Renesas E2 Lite") {
    //                         setTimeout(() => {
    //                             var res = pvi.runInstructionS("RENESAS.gravafw", [sessionStorage.getItem("Firmware")])
    //                             console.log(res);
    //                             if (res.includes("Operation completed.")) {
    //                                 if (sessionStorage.getItem("serialNumber") != null) {
    //                                     sessionStorage.setItem(sessionStorage.getItem("serialNumber"), true)
    //                                 }
    //                                 //this.Falhas.set("Gravacao", res)                                            
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             } else {
    //                                 this.Falhas.set("Gravacao", res)
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             }
    //                         }, 1000);

    //                     }
    //                     if (this.ConfigTest.Gravador == "ST-LINK/V2") {
    //                         setTimeout(() => {
    //                             pvi.runInstructionS("ST.writeoptionstm8_stlink", ["I:/Documentos/Softwares/STM8/despr_it.hex", this.ConfigTest.Micro])
    //                             var res = pvi.runInstructionS("ST.writefirmwarestm8_stlink", [sessionStorage.getItem("Firmware").replace(/\.stp|\.STP/, ".HEX"), "I:/Documentos/Softwares/STM8/opt.hex", this.ConfigTest.Micro])
    //                             console.log(res);
    //                             if (res.includes("Verifying PROGRAM MEMORY succeeds") && res.includes("Programming OPTION BYTE succeeds")) {
    //                                 if (sessionStorage.getItem("serialNumber") != null) {
    //                                     sessionStorage.setItem(sessionStorage.getItem("serialNumber"), true)
    //                                 }
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             } else {
    //                                 this.Falhas.set("Gravacao", res)
    //                                 this.MaquinaDeEstados("FinalizaTeste")
    //                             }
    //                         }, 1000);

    //                     }
    //                     if (this.ConfigTest.Gravador == "Cyclone") {
    //                         setTimeout(() => {
    //                             var observer = pvi.FWLink.globalDaqMessagesObservers.add((m, data) => {
    //                                 observer = () => { }
    //                                 console.log(m, data)
    //                                 if (data[0] == "Success") {
    //                                     if (sessionStorage.getItem("serialNumber") != null) {
    //                                         sessionStorage.setItem(sessionStorage.getItem("serialNumber"), true)
    //                                     }
    //                                     this.TestStatus.set("Gravador",sessionStorage.getItem("codGravador")    )
    //                                     this.MaquinaDeEstados("FinalizaTeste")
    //                                 } else {
    //                                     this.Falhas.set("Gravacao", data[0])
    //                                     this.MaquinaDeEstados("FinalizaTeste")
    //                                 }
    //                             }, "sniffer.exec_return.data")
    //                             pvi.runInstructionS("EXEC", ["C:/PEMicro/cyclone_pro/sap_launch.exe", "PORT=USB1", "true", "true"])

    //                         }, 1000);

    //                     }
    //                     if (this.ConfigTest.Gravador == "MPLAB PM3") {
    //                         var log = ""
    //                         setTimeout(() => {
    //                             var observer = pvi.FWLink.globalDaqMessagesObservers.add((m, data) => {
    //                                 observer = () => { }
    //                                 console.log(m, data)
    //                                 if(data.length != 0){
    //                                     log += data
    //                                     //this.ui.setMsg(log)
    //                                     if (data[0] == "Program Succeeded.") {
    //                                         if (sessionStorage.getItem("serialNumber") != null) {
    //                                             sessionStorage.setItem(sessionStorage.getItem("serialNumber"), true)
    //                                         }
    //                                         this.TestStatus.set("Gravador",sessionStorage.getItem("codGravador"))
    //                                         this.TestStatus.set("Log Gravador",log )
    //                                         this.MaquinaDeEstados("FinalizaTeste")
    //                                     } else if(data[0].includes("failed"))  {
    //                                         this.Falhas.set("Gravacao", data[0])
    //                                         this.MaquinaDeEstados("FinalizaTeste")
    //                                     }                                        
    //                                 }
    //                             }, "sniffer.exec_return.data")
    //                             pvi.runInstructionS("EXEC", ["C:/Program Files/Microchip/MPLABX/v5.45/mplab_platform/mplab_ipe/pm3cmd.exe", "-5 -P"+this.ConfigTest.Pic+" -F"+ sessionStorage.getItem("Firmware") +" -M", "true", "true"])
    //                             //pvi.runInstructionS("EXEC", ["C:/Program Files/Microchip/MPLABX/v5.45/mplab_platform/mplab_ipe/pm3cmd.exe", "-5 -P16F1938 -FI:\Documentos\Softwares\Microchip\16F1938\INV-54100\54v13\54v13_3.01.hex -M", "false", "true"])
    //                         }, 1000);

    //                     }
    //                 } else {
    //                     this.Falhas.set("Operacional", "Tempo de resposta excedido")
    //                     this.MaquinaDeEstados("FinalizaTeste")
    //                 }

    //             })


    //             break
    //         case "ValidaResultados":
    //             this.ValidaResultados(() => {
    //                 this.SetState("Next")
    //             })
    //             break
    //         case "FinalizaTeste":
    //             this.ui.setMsg("")
    //             this.SetState("# FinalizaTeste #")
    //             this.FinalizaTeste()
    //             break
    //     }

    // }
    // testeReqServer(op) {

    // }
    // FinalizaTeste() {
    //     if (this.ConfigTest != null) {
    //         if (this.ConfigTest.Rastreamento == "true" && !this.Falhas.has("Rastreamento")) {
    //             main.rastAPI.end(this.Falhas, this.TestStatus)
    //             console.warn("Falhas => " , this.Falhas, "Teste Status => ", this.TestStatus)
    //         }
    //     }
    //     this.ui.finalizaTeste(this.Falhas, this.TestStatus)
    // }

    // SetState(Etapa, timeOut = 0) {
    //     if (Etapa == "Next") {
    //         this.indTest++
    //         if (timeOut == 0) {
    //             console.log("Máquina estados -> ", main.ConfigTest.Tst_State[this.indTest])
    //             this.MaquinaDeEstados(main.ConfigTest.Tst_State[this.indTest])
    //         } else {

    //             console.log("Máquina estados -> ", "aguardando " + timeOut + "ms")

    //             setTimeout(() => {
    //                 console.log("Máquina estados -> ", main.ConfigTest.Tst_State[this.indTest])
    //                 this.MaquinaDeEstados(main.ConfigTest.Tst_State[this.indTest])
    //             }, timeOut)
    //         }
    //     }
    //     else {
    //         console.log("Aguardando..  ", Etapa)
    //     }
    // }

    // ConfiguraTest(codigo) {
    //     // codigo = codigo.split("=")
    //     // codigo = codigo[1]    
    //     if (codigo != "" && !isNaN(codigo)) {
    //         fetch("Produtos/" + codigo + ".json")
    //             .then(response => response.json())
    //             .then((json) => {
    //                 this.ConfigTest = json
    //                 this.ui.setImage("Imagens/padrao.png")
    //                 this.SetState("Next")
    //             })
    //     }

    // }
}

