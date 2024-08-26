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
    const bearerToken = resJson.access_token;

      //Request to Logic App
    try {
      const logicAppRequest = new Request(context.LOGIC_APP_URL, {
        method: "PATCH",
        body: JSON.stringify({action: action}),
        headers:{"Content-Type": "application/json","Authorization":"Bearer "+ bearerToken},
      });

      const logicAppRes = await fetch(logicAppRequest);
      const logicAppResText = await logicAppRes.text();
      return callback(null,logicAppResText);

    } catch (error){
      return callback (error);
    }
    
  } catch (error){
    return callback (error);
  }
};
