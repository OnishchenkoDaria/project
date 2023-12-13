import { useState } from "react";
import userService from "../services/registerForm";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/pathConstants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (par) => {
    const { name, value } = par.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (par) => {
    try {
      par.preventDefault();

      function newUser() {
        this.useremail = formInput.email;
        this.userpassword = formInput.password;
      }
      const UserInfo = new newUser();

      const success = await userService.loginUser(UserInfo);
      userService.getUser();
      if (success) {
        navigate(PathConstants.ACCOUNT);
      }
    } catch (err) {
      console.log("error caught");
      throw err;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control className="input-field" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" value={formInput.password} onChange={handleChange} placeholder="Password" autoComplete='off' required />
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default LoginForm;
