import React from 'react';
import { Button, Input, Form, Label} from 'reactstrap';
import './loginUser.css';

export default function LoginUser(props){
    return(
    <div className="loginIn">
        <Form method="POST" onSubmit={(e)=>{props.onLogin(e);}}>
          <Label>Имя пользователя: </Label>
          <Input name="login"/>
          <Label>Пароль: </Label>
          <Input name="pass" type="password"/>
          <Button>Войти в систему</Button>
        </Form>
    </div>
    )
}