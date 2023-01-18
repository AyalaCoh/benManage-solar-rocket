
const headers = {
    'Accept':'application/json',
    'UserID':'A0534139568@gmail.com',
    'ApiKey':'36c73de81f11e40c8e23f8fbb450ead386d11078591331eb65a4bf32ace24217'
  };
  
export const getFuelDeliveries = async (date:String) => {

  const response : Response = await fetch(`https://solar-rocket-fuel.benmanage.click/delivery/${date}`,
  {
    method: 'GET',
    headers: headers
  });

  if(response.ok){
     return await response.json();  
  }
  throw(await response.json());
}

export const getDays = async (date:String) => {
  const response : Response = await fetch(`https://solar-rocket-fuel.benmanage.click/deliveries?startDate=${date}&numberOfDays=5`,
  {
    method: 'GET',
    headers: headers
  });

  if(response.ok){
     return await response.json();  
  }
  throw(await response.json());
}




