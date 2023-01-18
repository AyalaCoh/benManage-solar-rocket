import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, Grid, IconButton, Typography } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import {getFuelDeliveries,getDays} from '../components/getFuelDeliveries'
import { useEffect,useState } from "react";


interface FuelDeliver{
  date: string,
  deliveries: [
    {
      type: string,
      quantity: 0,
      unit: string,
      icon: string
    }
  ]
}
interface DeliveryDates{
  deliveryDates:[];
}
    const getFuelDelivery = async(date:String) =>{
      return await getFuelDeliveries(date);
    }


const FuelDeliveries = (): JSX.Element => {
 
const [errMessage,setErrMessage] = useState<String | null>(null);
const [deliveryDates,setDeliveryDates] = useState<String[] | null>(null);
const [flag,setFlag] = useState<Boolean>(false);
const [count,setCount] = useState<number>(0);
const [fuelDelivery,setFuelDelivery] = useState<[{ type: string, quantity: 0,unit: string,icon: string}] | null>(null);
const [thistDate, setThisDate] = useState<Date | null>(null);


  const getfuelDelivery = async (num : number)=>{    
    setCount(num);
   if(deliveryDates != null){
    return await getFuelDelivery(deliveryDates[num])
    .then((result:FuelDeliver)=>{
      setFuelDelivery(result.deliveries)
    })
    .catch((err) => {
      setErrMessage(err);
      console.log(err);
    });
   }
  }

  

    const getDay = async () =>{    
     var dt = new Date();
     dt.setDate(dt.getDate() + 1);
     let date:string
     if(dt.getMonth() < 9){
      date = dt.getFullYear() +"-0" + (dt.getMonth()+1) + "-" + (dt.getDate());
     }
     else{
      date = dt.getFullYear() +"-" + (dt.getMonth()+1) + "-" + (dt.getDate());
    }
   return await getDays(date);
  }

 
  useEffect(() => {     
    getDay()
    .then((result:DeliveryDates) => {
      setDeliveryDates(result.deliveryDates); 
       getfuelDelivery(0);
          })
    .catch((err) => {
      setErrMessage("Invalid parameters.");
      console.log(err);
    });
  
  }, []); 

  

  return (
    <AppLayout title="Fuel Deliveries">
      <Container maxWidth="lg">
      <Typography variant="h4" component="h1">
      the Upcoming deliveries
    </Typography>
    <Typography variant="h6" component="h3">
           {
            deliveryDates?<>Deliveries on the next {count+1} st day in date:{deliveryDates[count]}
            </>:<></>   
          }


          </Typography>
        {/* {
       deliveryDates? <>{()=>{setFlag(true)}},{deliveryDates[0]} ,{deliveryDates[1]} ,{deliveryDates[2]} ,{deliveryDates[3]} ,{deliveryDates[4]}<br/></> : <>no</>
        } */}
        {
        fuelDelivery  ? ( <Grid container spacing={2}> 
        {" "}
        {fuelDelivery.map((fd:{ type: string, quantity: 0,unit: string,icon: string}) => (
          <Grid item key={8}> 
           <Card sx={{ width: 275, height: 200 }}>
           <CardContent>
           <Typography noWrap>        
          <img src={fd.icon}  alt="icon"/><br/>
           type:  {fd.quantity} <br/>
           quantity:  {fd.type}<br/>
           unit:  {fd.unit}<br/>
           </Typography>
        
        </CardContent>
        </Card></Grid>
        )) } 
        </Grid> ):  (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )
        }
        {/* {fuelDelivery[0].quantity},{fuelDelivery[0].unit},{fuelDelivery[0].type} */}
      <Button onClick={ ()=>{getfuelDelivery(0)}}>See the deliveries for the next day</Button><br/>
      <Button onClick={ ()=>{getfuelDelivery(1)}}>See the deliveries for the next two days</Button><br/>
      <Button onClick={ ()=>{getfuelDelivery(2)}}>See the deliveries for another three days</Button><br/>
      <Button onClick={ ()=>{getfuelDelivery(3)}}>See the deliveries for another four days</Button><br/>
      <Button onClick={ ()=>{getfuelDelivery(4)}}>See the deliveries for another five days</Button>
      </Container>
    </AppLayout>
  );
};

export { FuelDeliveries as FuelDeliveries };
