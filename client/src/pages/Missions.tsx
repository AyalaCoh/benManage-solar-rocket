import { SyntheticEvent, useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { fetchGraphQL} from "../graphql/GraphQL";
import { Mission} from "../graphql/schema";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Add as AddIcon,
  FilterAlt as FilterAltIcon,
  Sort as SortIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ListMenu } from "../components/ListMenu";


type SortField = "Title" | "Date" | "Operator";

interface MissionsResponse {
  data: {
    Missions: Mission[];
  };
}
interface NewMissions {
  data: {
    createMission: Mission;
  };
}

const getMissions = async (
  sortField: SortField,
  sortDesc?: Boolean
): Promise<MissionsResponse> => {
  return await fetchGraphQL(
    `
  {
    Missions(
      sort: {      
       desc: ${sortDesc}
       field: ${sortField}
      }
    ) {
      id
      title
      operator
      launch {
        date
      }
    }
  }
  `,
    []
  );
};

const createMission = async (
  title: String,
  operator: String,
  date: Date,
  vehicle: String,
  name: String,
  longitude: Number,
  latitude: Number,
  periapsis: Number,
  apoapsis: Number,
  inclination: Number,
  capacity: Number,
  available: Number
): Promise<NewMissions> => {
  return await fetchGraphQL(
    `mutation ($title: String!, $operator: String!, $date: DateTime!, $vehicle: String!, $name: String!, $longitude: Float!, $latitude: Float!, $periapsis: Int!, $apoapsis: Int!, $inclination: Int!, $capacity: Int!, $available: Int!){
			createMission(mission: {
				title: $title,
				operator: $operator,
				launch:{
				date: $date,
				vehicle: $vehicle,
            location: {
              name: $name,
              longitude: $longitude,
              latitude: $latitude,
                      },				
			      	},
				orbit:{
				periapsis: $periapsis,
				apoapsis: $apoapsis,
				inclination: $inclination,
				},
				payload:{
				capacity: $capacity,
				available: $available
				}
			}){
				id
				title
				operator
				launch {
				date
				}
			}
		}
		`,
   {title: title, operator: operator, date: date?.toISOString(), vehicle: vehicle, name: name, longitude: longitude, latitude: latitude, periapsis: periapsis, apoapsis: apoapsis, inclination: inclination, capacity: capacity, available: available }
  );
};

const Missions = (): JSX.Element => {
  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [newMissionOpen, setNewMissionOpen] = useState(false);
  const [tempLaunchDate, setTempLaunchDate] = useState<Date | null>(null);
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortField>("Title");
  const [errMessage, setErrMessage] = useState<String | null>(null);
  const [newMiss, setNewMiss] = useState<Mission | null>(null);
  //state for the dialog
  const [title, setTitle] = useState<String>(" ");
  const [operator, setOperator] = useState<String>(" ");
  const [launchDaye, setLaunchDaye] = useState<Date | null>(null);
  const [launchVehicle, setLaunchVehicle] = useState<String>(" ");
  const [locationName, setLocationName] = useState<String>(" ");
  const [locationLongitude, setLocationLongitude] = useState<Number>(0);
  const [locationLatitude, setLocationLatitude] = useState<Number>(0);
  const [orbitApoapsis, setOrbitApoapsis] = useState<Number>(0);
  const [orbitInclination, setOrbitInclination] = useState<Number>(0);
  const [payloadCapacity, setPayloadCapacity] = useState<Number>(0);
  const [payloadAvailable, setPayloadAvailable] = useState<Number>(0);
  const [OrbitPeriapsis, setOrbitPeriapsis] = useState<Number>(0);


  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  const handleNewMissionOpen = () => {
    setTempLaunchDate(null);
    setNewMissionOpen(true);
  };

  const handleNewMissionClose = () => {
    setNewMissionOpen(false);
  };

  const aNewMission = () =>{ 
    handleNewMissionClose();
     if(launchDaye != null){
      createMission(
      title,operator,launchDaye,launchVehicle,locationName,locationLongitude,locationLatitude,
      OrbitPeriapsis,orbitApoapsis,orbitInclination,payloadCapacity,payloadAvailable
     ).then((result: NewMissions) => {
      setNewMiss(result.data.createMission)
     }) .catch((err) => {
      setErrMessage("Failed to load missions.");
      console.log(err);
    });;}

};

  const handleTempLaunchDateChange = (newValue: Date | null) => {
    setTempLaunchDate(newValue);
    setLaunchDaye(newValue);
  };

  const handleSortFieldChange = (event: SyntheticEvent, value: SortField) => {
    setSortField(value);
  };
  const handleSortDescClick = () => {
    setSortDesc(!sortDesc);
  };

  useEffect(() => {
    getMissions(sortField,sortDesc)
      .then((result: MissionsResponse) => {
        setMissions(result.data.Missions);
      })
      .catch((err) => {
        setErrMessage("Failed to load missions.");
        console.log(err);
      });
  }, [sortField,sortDesc]);

  return (
    <AppLayout title="Missions"> 
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">
          Solar Rocket Missions
        </Typography>
        <Toolbar disableGutters>
          <Grid justifyContent="flex-end" container>
            <IconButton>
              <FilterAltIcon />
            </IconButton>
            <ListMenu
              options={["Date", "Title","Operator"]}
              endIcon={<SortIcon />}
              onSelectionChange={handleSortFieldChange}
            />
            <IconButton onClick={handleSortDescClick}>
              {sortDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </IconButton>
          </Grid>
        </Toolbar>

        {missions ? (
          <Grid container spacing={2}>
            {" "}
            {missions.map((missions: Mission, key: number) => (
              <Grid item key={key}>
                <Card sx={{ width: 275, height: 200 }}>
                  <CardHeader
                    title={missions.title}
                    subheader={new Date(missions.launch.date).toDateString()}
                    operator={missions.operator}
                  />
                  <CardContent>
                    <Typography noWrap>{missions.operator}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <Tooltip title="New Mission">
          <Fab
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="primary"
            aria-label="add"
            onClick={handleNewMissionOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Dialog
          open={newMissionOpen}
          onClose={handleNewMissionClose}
          fullWidth
          maxWidth="sm"
        > 
          <DialogTitle>New Mission</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item> 
                <TextField
                  autoFocus id="title" label="Title" variant="standard" onChange={(e)=>{setTitle(e.target.value)}} fullWidth />
              </Grid>
              
              <Grid item> 
                <TextField autoFocus id="operator"label="Operator"variant="standard" onChange={(e)=>{setOperator(e.target.value)}} fullWidth/>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minDate={new Date()} minTime={new Date()} label="Launch Date" value={tempLaunchDate} onChange={handleTempLaunchDateChange} renderInput={(params) => (  <TextField variant="standard" {...params} />  )} />
                </LocalizationProvider>
              </Grid>
              
              <Grid item> 
                <TextField autoFocus id="launchVehicle" label="launchVehicle" variant="standard" onChange={(e)=>{setLaunchVehicle(e.target.value)}} fullWidth />
              </Grid>
              
              <Grid item> 
                <TextField autoFocus id="locationName" label="LocationName" variant="standard" onChange={(e)=>{setLocationName(e.target.value)}} fullWidth />
              </Grid>
              
              <Grid item> 
                <TextField autoFocus id="longitude" label="LocationLongitude" variant="standard" onChange={(e)=>{setLocationLongitude(Number(e.target.value))}} fullWidth  />
              </Grid>
              <Grid item> 
                <TextField autoFocus id="locationLatitude" label="LocationLatitude" variant="standard" onChange={(e)=>{setLocationLatitude(Number(e.target.value))}} fullWidth />
              </Grid>
              <Grid item>
                <TextField autoFocus id="orbitPeriapsis" label="orbitPeriapsis" variant="standard" onChange={(e)=>{setOrbitPeriapsis(Number(e.target.value))}} fullWidth />
              </Grid>
              <Grid item> 
                <TextField autoFocus id="orbitApoapsis" label="orbitApoapsis" variant="standard" onChange={(e)=>{setOrbitApoapsis(Number(e.target.value))}} fullWidth
                />
              </Grid>
              <Grid item> 
                <TextField autoFocus id="orbitInclination" label="orbitInclination" variant="standard" onChange={(e)=>{setOrbitInclination(Number(e.target.value))}} fullWidth />
              </Grid>
              <Grid item> 
                <TextField autoFocus id="payloadCapacity" label="payloadCapacity" variant="standard" onChange={(e)=>{setPayloadCapacity(Number(e.target.value))}} fullWidth />
              </Grid>
              <Grid item> 
                <TextField  autoFocus  id="payloadAvailable"  label="payloadAvailable" variant="standard" onChange={(e)=>{setPayloadAvailable(Number(e.target.value))}} fullWidth />
              </Grid>
            </Grid>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewMissionClose}>Cancel</Button>
            <Button onClick={ ()=>{aNewMission() }}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Missions };
