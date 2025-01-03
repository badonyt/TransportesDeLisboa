import fetch, { Response } from "node-fetch";
import https from "https";
import countryTable from "../master-key.json" with { type: "json" };
import { URLSearchParams } from "url";

const url = "https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/";

interface MetroResponseStatus {
  codigo: number;
  resposta: {
    amarela: string;
    verde: string;
    azul: string;
    vermelha: string;
  };
}
/*interface MetroResponseKey {
  acess_token: string;
  scope: string;
  token_type: string;
  expires_in: number
}*/

async function generatekey(): Promise<string | undefined> {
  const credentials = `${countryTable.consumer_key}:${countryTable.consumer_secret}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");
  const url = "https://api.metrolisboa.pt:8243/token";

  const data = new URLSearchParams({
    grant_type: "client_credentials",
  });

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const headers = {
    Authorization: "Basic " + encodedCredentials,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data.toString(),
      headers: headers,
      agent: agent,
    });

    const s: unknown = await response.json();

    if (response.ok) {
      //@ts-ignore
      return s.access_token; // Properly returning the access token
    } else {
      //@ts-ignore
      throw new Error(`Error getting token: ${s.error}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return undefined; // Return undefined in case of error
  }
}

async function requestFromMetro(
  urls: string = url,
  location: string,
  key: string,
): Promise<MetroResponseStatus | undefined> {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + key,
    },
    agent: agent,
  };

  try {
    const response: Response = await fetch(urls + location, options);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
}

export async function status(): Promise<Record<string, string> | string> {
  //@ts-ignore
  const key: Promise<string | undefined> = await generatekey();
  //console.log(key);
  if (typeof key == "string") {
    const response = await requestFromMetro(url, "estadoLinha/todos", key);
    if (response && response.codigo == 200) {
      const { amarela, verde, azul, vermelha } = response.resposta;
      return { amarela, verde, azul, vermelha };
    } else {
      throw new Error(`json not in valid format`);
    }
  } else {
    throw new Error(`Key not working`);
  }
}

export async function timeforstation(
  estacao: string,
): Promise<Record<string, string> | string> {
  //@ts-ignore
  const key: Promise<string | undefined> = await generatekey();
  //console.log(key);
  if (typeof key == "string") {
    const response = await requestFromMetro(
      url,
      "tempoEspera/Estacao/" + estacao,
      key,
    );
    if (response && response.codigo == 200) {
      return response.resposta;
    } else {
      throw new Error(`json not in valid format`);
    }
  } else {
    throw new Error(`Key not working`);
  }
}
export async function available_stations_request(): Promise<
  Record<string, string> | string
> {
  //@ts-ignore
  const key: Promise<string | undefined> = await generatekey();
  //console.log(key);
  if (typeof key == "string") {
    const response = await requestFromMetro(url, "infoEstacao/todos", key);
    if (response && response.codigo == 200) {
      return response.resposta;
    } else {
      throw new Error(`json not in valid format`);
    }
  } else {
    throw new Error(`Key not working`);
  }
}

export async function available_destinos(): Promise<
  Record<string, string> | string
> {
  //@ts-ignore
  const key: Promise<string | undefined> = await generatekey();
  //console.log(key);
  if (typeof key == "string") {
    const response = await requestFromMetro(url, "infoDestinos/todos", key);
    if (response && response.codigo == 200) {
      return response.resposta;
    } else {
      throw new Error(`json not in valid format`);
    }
  } else {
    throw new Error(`Key not working`);
  }
}
