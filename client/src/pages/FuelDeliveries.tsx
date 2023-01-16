import { Container } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";

const FuelDeliveries = (): JSX.Element => {
  return (
    <AppLayout title="Fuel Deliveries">
      <Container maxWidth="lg">
        <div>Fuel Deliveries!</div>
      </Container>
    </AppLayout>
  );
};

export { FuelDeliveries as FuelDeliveries };
