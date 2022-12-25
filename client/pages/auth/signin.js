import { useState } from 'react';
import { useRouter } from "next/router";

import useRequest from '../../hooks/use-request';

export default () => {
  const Router = useRouter();

  const [email, setEmail] = useState('test1@test.com');
  const [password, setPassword] = useState('test1234');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: (data) => Router.push('/')
  });


  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {errors}
            <button className="btn btn-primary">Sign in</button>
        </form>
    );
};