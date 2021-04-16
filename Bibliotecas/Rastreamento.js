class RastAPI{
    constructor(Context){
        this.rastreamento = new _rastreamento(); 
        this.Context = Context          
    }

    init(callback){
       
        this.getOperador(()=>{
            //sessionStorage.clear()
            this.getSerial(callback)
        })
        //this.rastreamento.setValidations({"User":"disabled"})
        //this.rastreamento.setValidations({"Station":"disabled"})
        this.rastreamento.setValidations({"Script":"disabled"})
        //this.rastreamento.setValidations({"Map":"disabled"})
    }




    getOperador(callback){
        if(PVI.runInstructionS("ras.getuser",[]) =="" ){
           // if(this.Context.camScan){
                this.Context.ui.setMsg("Informe o Crachá")
                this.Context.ui.imgTest.style.display = "none"
                BarcodeScanner(this.Context.ui.video, (value)=>{
                    if (!isNaN(value)) {                        
                        PVI.runInstructionS("ras.setuser",[value])
                        callback()                   
                     
                    } else {
                        this.Context.ui.getInsertedValue("Informe o Número do Crachá", (value)=>{   
                            PVI.runInstructionS("ras.setuser",[value])
                            callback()      
                            } )
                    }                              
                })
            //}
        }else{
            callback()
        } 
    }

    isFirstExec (){
        if (pvi.getVar("_execcount") == 0 ) {           
            return true            
        }else{
            return false
        }
    }

    start (callback) {
        //console.warn("start rast");
        if(this.Context.ConfigTest.Rastreamento == "true"){   
            
            this.rastreamento.setOnlyPVI(true);
        
            this.rastreamento.init((result, info) => {
                //Ui.RelatorioHtml(info.Message);
                if (!result){
                    callback(false,info.Message)                       
                }else{
                    callback(true,info.Message)
                }
            }, this.Context.Map, this.Context.Evt, window.sessionStorage.getItem("serialNumber")) 
        }else{
            console.warn("Rastreamento -> ", "Desativado")
            callback(true)
        }    
    }

    startConcatena  (SucessEtp, FailEtp) {    
        if(this.Context.ConfigTest.Rastreamento == "true"){
            this.labels = new LabelsLink();      
            this.rastreamento = new _rastreamento(); 
            this.rastreamento.setOnlyPVI(true);
        
            this.rastreamento.init((result, info) => {
                if (!result){
                    pvi.ui.msgError(info.Message, function () {
                        Falhas.set("Rastreamento", info.Message)
                        SetEstado(FailEtp)
                    });
                } else {
                    let r = this.labels.init(this.rastreamento.getProductCode());
                    if (!r.error) {
                        let l = this.labels.getLinkedCodes(this.rastreamento.getProductCode());
                        if(l instanceof Array && l.length == 0){
                            // pedir segundo codigo
                            let segundoCod = pvi.runInstructionS("ras.gettext", ["QR CODE", "QR CODE:\nInforme o código QR CODE do controlador"]);
                            let lr = this.labels.link(this.rastreamento.getProductCode(),[segundoCod]);
                            if(!lr.hasError){
                                // tudo certo concatenou
                                //console.log("concatenou");
                                SetEstado(SucessEtp)    
                            } else {
                                console.log(lr);
                                // deu erro denovo putz
                                console.error("erro ao concatenar")
                            }
                        } else if(l instanceof Array) {
                            // tudo certo ja ta concatenado
                            //console.log("ja tava concatenado");
                            SetEstado(SucessEtp)
                        } else {
                            // deu erro no pedi a etiqueta
                            console.error("erro no pedir a etiqueta");
                        }
                    } else {
                        console.error(ret.msg);

                        
                        // deu erro dnv
                    }
                }
            }, MAP, EVENT, window.sessionStorage.getItem("serialNumber")) 
        }else{
            console.log("Rastreamento -> ", "Desativado")
            SetEstado(SucessEtp)
        }    
    }


    getSerial (callback){ 

        this.Context.ui.setMsg("Informe o número de série do produto.")
        this.Context.ui.imgTest.style.display = "none"
        BarcodeScanner(this.Context.ui.video, (value)=>{
            if(!isNaN(value)  ){                               
                setSerialCode (value, this) 
                callback (true)
            }else{
                ResetBarcodeScanner(this.Context.ui.video, ()=>{
                    this.Context.ui.getInsertedValue("Informe o Número de Série", (value)=>{
                        if(value != null && value != "" && value.length == 13 ){
                            setSerialCode (value, this)
                            callback(true)                       
                        }else{
                            this.Context.Falhas.set("Serial", "Serial informato inválido")
                            this.Context.MaquinaDeEstados("FinalizaTeste")
                        }                    
                    } )
                })
                      
            }
        })            
        
        
        function setSerialCode (serialNumber, self) {            
            if (serialNumber == "" || isNaN(serialNumber)) {            
                    pvi.ui.showErrorReport("Controlador não encontrado\nReinicie o teste!")
            } else{ 
                 sessionStorage.setItem("serialNumber", serialNumber);
                // if(!reqErp){
                //     var cookie = document.cookie.split(";")            
                //     // var CodModelo = cookie[1].substring(cookie[1].indexOf("=")+1)
                //     // var Firmware = cookie[2].substring(cookie[1].indexOf("=")+1) 
                //     self.setCookie(cookie)           
                // }
                // else if(reqErp){                               
                    self.requestERP()
                // }    
            }
        }
    }
    

    requestERP (tipo = "SN", callback) {
        var httpReq = new XMLHttpRequest();
        self = this
        if(tipo == "SN"){
            var URL=  "http://rast.inova.ind.br/api/effective/products/"+ sessionStorage.getItem("serialNumber");
            httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) { 
                    let ERPData = JSON.parse(httpReq.responseText)
                    if(sessionStorage.getItem("ProductCode") != ERPData.Information.ProductCode){
                        sessionStorage.setItem("FirstExec",true) 
                    }else{
                        sessionStorage.setItem("FirstExec",false) 
                    }
                    sessionStorage.setItem("ProductCode",ERPData.Information.ProductCode)
                    sessionStorage.setItem("CodModelo",ERPData.Information.ERPName)
                    sessionStorage.setItem("Firmware",ERPData.Information.Firmware)
                    sessionStorage.setItem("TestScript",ERPData.Information.TestScript)
                    
                    //self.Context.ConfiguraTest(ERPData.Information.ProductCode)
    
                    console.log("requisição HTTP: " + httpReq.statusText)                
                }else if ( this.status == 400){
                    pvi.ui.showErrorReport("Controlador não encontrado no servidor\nReinicie o teste!")                
                }
            }
        }else if (tipo == "OP") {
            var URL=  "http://rast.inova.ind.br/api/effective/orders/0/"+ sessionStorage.getItem("OP")
            httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) { 
                    let ERPData = JSON.parse(httpReq.responseText)
                    ERPData.SerialNumbers.forEach((serial)=>{                        
                        sessionStorage.setItem(serial.Code,false)
                    })
                    sessionStorage.setItem("QtdOP",ERPData.Quantity)
                    sessionStorage.setItem("Produto",ERPData.Product.ERPName)
                    sessionStorage.setItem("codProduto",ERPData.Product.ProductCode)   
                    sessionStorage.setItem("Firmware",ERPData.Product.Firmware)
                    callback()    
                    //console.log("requisição HTTP: " + ERPData)               
                }else if ( this.status == 400){
                    pvi.ui.showErrorReport("Falha na requisição do servidor")               
                }
            }

        }
        httpReq.open("GET", URL, true);
        httpReq.send();
    }

    end(Erros, StatusTeste) {    
        // Resultado -> boolean aprovado ou reprovado no teste
        // Erros -> chave e valor dos erros ou resultados 
        var keyValues = new KeyValueClass()
        if(Erros.size != 0){
            Erros.forEach((valor, chave) => {                   
                keyValues.add(chave.toString(),valor)
            })
        }
        if(StatusTeste.size != 0){
            StatusTeste.forEach((valor, chave) => {                   
                keyValues.add(chave.toString(),valor)       
            })
        }

        this.rastreamento.end(function(result,info){
            console.log("fim do rastreamento: = " + result);
            console.log(info);
        },Erros.size == 0,keyValues,[]);
        return   
    }
    getJiga () {        
        return pvi.runInstructionS("ras.gettext", ["Setup Teste", 
        "Auto-Configurador:\nInforme o codigo de barras Da Jiga que será utilizada para realizar o teste!"])        
    }
}