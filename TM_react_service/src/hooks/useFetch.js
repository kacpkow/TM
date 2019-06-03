import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config/constants';
import { useUser } from '../contexts/User';

const useFetch = ({
  method = 'get', url, data, headers, onMount, onFetch, onError
}) => {
  const { user } = useUser();

  const [loading, setLoading] = useState(onMount);
  const [response, setResponse] = useState([]);
  const [errors, setErrors] = useState([]);

  const Authorization = user ? `Token ${user.token}` : undefined;

  const fetch = async (opts) => {
    setLoading(true);

    try {
      const { data: result } = await axios(
        _.merge(
          {},
          {
            baseURL: API_URL,
            headers: {
              ...headers,
              Authorization
            },
            url,
            method,
            data
          },
          opts
        )
      );

      setResponse(result);

      if (onFetch) {
        onFetch(result);
      }
    } catch (error) {
      setErrors(_.get(error, 'response.data'));

      if (onError) {
        onError(error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (onMount) {
      fetch();
    }
  }, []);

  return {
    response,
    errors,
    loading,
    fetch
  };
};

export default useFetch;
