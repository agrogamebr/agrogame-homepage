import ky from 'ky';
import React, { useCallback } from 'react';

export interface IBGEMunicipio {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

export interface City {
  value: string;
  label: string;
}

const ibgeApi = ky.create({
  prefixUrl: 'https://servicodados.ibge.gov.br/api/v1/localidades',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
});

export const fetchCitiesByState = async (stateCode: string): Promise<City[]> => {
  try {
    const response = await ibgeApi.get(`estados/${stateCode}/municipios`);
    const municipios: IBGEMunicipio[] = await response.json();
    
    return municipios
      .map((municipio) => ({
        value: municipio.nome,
        label: municipio.nome,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    throw new Error('Não foi possível carregar as cidades. Tente novamente.');
  }
};

export const useCities = () => {
  const [cities, setCities] = React.useState<City[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadCities = useCallback(async (stateCode: string) => {
    if (!stateCode) {
      setCities([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const citiesData = await fetchCitiesByState(stateCode);
      setCities(citiesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCities = useCallback(() => {
    setCities([]);
    setError(null);
  }, []);

  return {
    cities,
    loading,
    error,
    loadCities,
    clearCities,
  };
};