/*primero tenemos que activar un useffect para activar el fetch de la api
luego creamos la funcion getTodos para obtener las tareas de la api (las tareas que hasta el momento exites y las que se creen)
creamos un try catch para manejar los errores
hacemos una peticion a la api con fetch
si la respuesta es 404 significa que el usuario no existe y debemos crearlo
creamos la funcion createUser para crear un usuario*/

import React, { useEffect, useState } from "react"; // importamos useEffect y useState de react.
import "../../styles/index.css"; // importamos el archivo de estilos.

const Home = () => {
  const [value, setValue] = useState(""); // creamos un estado para el valor del input.
  const [todos, setTodos] = useState([]); // creamos un estado para las tareas pero inicializamos con un arreglo vacio que sera llenado con las tareas que obtengamos de la API.

  useEffect(() => {
    // useEffect es un hook que se ejecuta cuando el componente se monta.
    getTodos(); // llamamos a la funcion getTodos para obtener las tareas de la API.
  }, []);

  const getTodos = async () => {
    // creamos una funcion asincrona para obtener las tareas de la API y llenar el estado de las tareas.
    try {
      const response = await fetch(  // creamos una constante llamada response que va a esperar a que se resuelva la peticion a la API.
        // hacemos una peticion a la API.
        "https://playground.4geeks.com/todo/users/L-vera" // la URL de la API.
      );
      console.log(response);// mostramos en consola la respuesta de la API. es muy muy muy IMPORTANTE. para identificar errores desde el navegador.
      if (response.status === 404) {
        // por ejemplo es decir que se tiene que conocer medianamnete la API si la respuesta es 404 significa que el usuario no existe y debemos crearlo
        await createUser(); // llamamos a la funcion createUser para crear un usuario.
        return; // retornamos para que no se ejecute el codigo de abajo.
        //esto funciona como una especie de seguro donde cortamos la ejecucion del codigo si no se cumple la condicion.
      }
      const data = await response.json(); // esto es para convertir la respuesta en un objeto de javascript que podamos manipular
      console.log(data.todos);
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/L-vera",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);// mostramos en consola el error.
    }
  };

  const addTodo = async () => {// creamos una funcion asincrona para agregar una tarea a la API.
    // creamos una funcion asincrona para agregar una tarea a la API.
    
    try {
      let payload = {
        label: value,
        done: false,
      };
      //
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/L-vera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),    
        }  
      );
      console.log(response);
      if (response.status === 201) {
        let data = await response.json();
        setTodos([...todos, data]);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (index) => {
    try {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${todos[index].id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const count = `Tienes ${todos.length} Tareas Pendientes`;
//-----------------------------------------------------------------------------------------------//
  return (
    <div className="container">
      <h1> To-Do <span>List✔</span></h1>

      <input
        id="access"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value !== "") {
            addTodo();
            setValue("");
          }
        }}
        placeholder="Ingresa Una Nueva tarea y presiona Enter"
      />

      <ul className="list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}
            <button onClick={() => removeTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <p className="counter">{count}</p>
    </div>
  );
};

export default Home;
