import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const App: React.FC = () => {
    const [countryCode, setCountryCode] = useState<string>("");

    const { loading: loadingCountries, error: errorCountries, data: dataCountries } = useQuery(GET_COUNTRIES);

    const { loading: loadingCountry, error: errorCountry, data: dataCountry } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code: countryCode },
        skip: !countryCode,
    });

    const handleSearch = () => {
        if (countryCode.trim()) {
            setCountryCode(countryCode.toUpperCase());
        }
    };

    return (
        <Container>
            <Accordion style={{ marginTop: 20 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h5">Search for a Country by Code</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Country Code"
                        variant="outlined"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />

                    {loadingCountry && <CircularProgress />}
                    {errorCountry && <Alert severity="error">{errorCountry.message}</Alert>}
                    {dataCountry && dataCountry.country && (
                        <Grid container spacing={3} style={{ marginTop: 20 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {dataCountry.country.name} ({dataCountry.country.code})
                                        </Typography>
                                        <Typography variant="body1">
                                            Capital: {dataCountry.country.capital}
                                        </Typography>
                                        <Typography variant="body1">
                                            Currency: {dataCountry.country.currency}
                                        </Typography>
                                        <Typography variant="body2">
                                            Languages:
                                            {dataCountry.country.languages.map((lang: any) => (
                                                <Chip
                                                    key={lang.name}
                                                    label={lang.name}
                                                    size="small"
                                                    style={{ marginLeft: 5 }}
                                                />
                                            ))}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ marginTop: 20 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5">Countries List</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loadingCountries && <CircularProgress />}
                    {errorCountries && <Alert severity="error">{errorCountries.message}</Alert>}
                    {dataCountries && (
                        <Grid container spacing={3}>
                            {dataCountries.countries.map((country: any) => (
                                <Grid item xs={12} sm={6} md={4} key={country.code}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {country.name} ({country.code})
                                            </Typography>
                                            <Typography variant="body1">
                                                Capital: {country.capital}
                                            </Typography>
                                            <Typography variant="body1">
                                                Currency: {country.currency}
                                            </Typography>
                                            <Typography variant="body2">
                                                Languages:
                                                {country.languages.map((lang: any) => (
                                                    <Chip
                                                        key={lang.name}
                                                        label={lang.name}
                                                        size="small"
                                                        style={{ marginLeft: 5 }}
                                                    />
                                                ))}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

export default App;
