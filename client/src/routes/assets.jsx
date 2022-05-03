import {DashboardLayout} from '../dashboard/dashboard-layout'
import axios from 'axios';





const handleReq = result => {

  axios({
    method:"get",
    url:"http://localhost:3030/assets",
    headers:{

      'x-auth-token' : localStorage.getItem('token')

  },
    // data:user,
    
    
    

})

    .then((res) => {
      result = res.data
      console.log(result)
      // var myHeaders = new Headers();
      // console.log(myHeaders.get('x-auth-token'));
      // console.log(res.status);
    //   if(userIsLogin(res)) {
    //     localStorage.setItem('token',res.headers['x-auth-token'])
    //     window.location.href = "http://localhost:3000/dashboard";
    //     auth.login( () => {
         
    //       // console.log(window.location)
    //       // this.props.history.push("/dashboard" , { state: auth.isAuthenticated()})
    //     //  this.props.history.push("/dashboard", { state: auth.isAuthenticated()})
          
          
    //       //  window.location.reload(false);
    //       console.log(auth.isAuthenticated())
         
       

    //  })

    //   };
      

      

      
    })
    .catch(err => {
    //  alert(err.response.data)
     
    });
  

}


export default function Assets() {

    // const result = {}
    // handleReq(result)

    



    return (
        <DashboardLayout>

        </DashboardLayout>
      
    );
  }

//   <main style={{ padding: "1rem 0" }}>
//         <h2>Assets</h2>
//       </main>