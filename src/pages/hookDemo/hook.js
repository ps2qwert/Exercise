/*
 * @Author: PengKang
 * @Date: 2020-06-16 17:28:59
 * @LastEditors: PengKang
 * @LastEditTime: 2020-06-16 17:38:07
 * @FilePath: \exercise\src\pages\hookDemo\hook.js
 */ 
import React, { useState,useEffect,useCallback,useContext } from 'react';

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};