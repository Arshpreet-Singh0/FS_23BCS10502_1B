function Box1({value,price ,features}){
    console.log(features);
   return(
       <div className="box-styling">
       <h3>heyyyyy!</h3>
       <h4>My value is: {value} </h4>
       <br></br>
       <h4>Price is :{price}</h4>
       <p>The box has: {features?.map((feature) => (
           <li>{feature}</li>
           ))}
       </p>
       </div>
   );
}
export default Box1;