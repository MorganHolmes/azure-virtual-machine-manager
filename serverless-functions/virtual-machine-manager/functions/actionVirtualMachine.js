exports.handler = async(context, event, callback) => {
  const action = event.action;
  // Azure Authentication to obtain bearer token
  try{
    const formData = new FormData();
    formData.append("client_id", context.AZURE_CLIENT_ID);
    formData.append("client_secret",context.AZURE_CLIENT_SECRET);
    formData.append("grant_type", 'client_credentials');
    formData.append("resource",'https://management.core.windows.net');

    const authRequest = new Request('https://login.microsoftonline.com/'+context.AZURE_TENANT_ID+'/oauth2/token', 
      {
        method: "POST",
        body: formData,
      });

    const res = await fetch(authRequest);
    const resJson = await res.json();
  

    //console.log(resJson);
    return callback(null, res);

    } catch (error){
    return callback (error);

  }
  //Request to logic app
  // try{
  //   const instance = axios.create({
  //     baseURL: context.LOGIC_APP_URL,
  //     headers: {},
  //   });

  // } catch (error){
  //   return callback (error);

  // }





  // if (action === "start"){
  //   return callback(null, )

  // } else if (action === "stop"){
  //   return callback(null,)

  // } else if (action === "status"){
  //   return callback(null,)

  // } else {
  //   return callback("Error - Invalid Action")
  // }
};
