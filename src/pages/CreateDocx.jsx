import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const InputItem = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginRight: theme.spacing(2),
}));

const BusinessForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: theme.spacing(2),
}));

const FormAction = styled("div")(({ theme }) => ({}));

const initDocs = {
  COMPANYNAME: "",
  CUSTOMERNAME: "",
  CompanyAddressLine1: "",
  CompanyAddressLine2: "",
  CustomerAddressLine1: "",
  CustomerAddressLine2: "",
  Date: "",
  ExpiryDate: "",
  QuoteNumber: "",
  WEBSITE: "",
  billed_items: {
    insert_rows: [
      ["Apples", "3", "$5.00", "$15.00"],
      ["Oranges", "2", "$5.00", "$10.00"],
    ],
  },
  days: "",
  total: "",
};

const CreateDocx = (props) => {
  const [input, setInput] = React.useState(initDocs);

  const handleInpt = (e) => {
    e.preventDefault();
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Layout>
      <Card>
        <CardHeader title="Create Document" subheader="" />
        <CardContent>
          <BusinessForm autoComplete="off">
            <InputItem>
              <TextField
                required
                id="outlined-required-name"
                label="COMPANYNAME"
                size="small"
                name="COMPANYNAME"
                value={input.COMPANYNAME || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="CUSTOMERNAME"
                label="CUSTOMERNAME"
                size="small"
                name="CUSTOMERNAME"
                value={input.CUSTOMERNAME || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="CompanyAddressLine1"
                label="CompanyAddressLine1"
                size="small"
                name="CompanyAddressLine1"
                value={input.CompanyAddressLine1 || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="CompanyAddressLine2"
                label="CompanyAddressLine2"
                size="small"
                name="CompanyAddressLine2"
                value={input.CompanyAddressLine2 || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="CustomerAddressLine1"
                label="CustomerAddressLine1"
                size="small"
                name="CustomerAddressLine1"
                value={input.CustomerAddressLine1 || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="CustomerAddressLine2"
                label="CustomerAddressLine2"
                size="small"
                name="CustomerAddressLine2"
                value={input.CustomerAddressLine2 || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="Date"
                label="Date"
                size="small"
                name="Date"
                value={input.Date || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="ExpiryDate"
                label="ExpiryDate"
                size="small"
                name="ExpiryDate"
                value={input.ExpiryDate || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="QuoteNumber"
                label="QuoteNumber"
                size="small"
                name="QuoteNumber"
                value={input.QuoteNumber || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="WEBSITE"
                label="WEBSITE"
                size="small"
                name="WEBSITE"
                value={input.WEBSITE || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="days"
                label="days"
                size="small"
                name="days"
                value={input.days || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <InputItem>
              <TextField
                required
                id="total"
                label="total"
                size="small"
                name="total"
                value={input.total || ""}
                onChange={handleInpt}
              />
            </InputItem>

            <FormAction>
                <Link to="/render-docx" state={input}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ marginRight: "15px" }}
                        
                    >
                        Save
                    </Button>
              </Link>
            </FormAction>
          </BusinessForm>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CreateDocx;
