import React, { useState, useEffect } from 'react';
import "./todo.css"
const userList = [{ firstName: 'Ram', lastName: 'krishan', phone: 1234567, email: 'ram@gmail.com', userId: 1 }]
function ToDo() {
const [list, setList] = useState([...userList])
const [addFileds, setFileds] = useState({ firstName: '', lastName: '', phone: '', email: '', });
const [validation, setValidation] = useState({ firstName: false, lastName: false, phone: false, email: false })
const [buttonLable, setButtonLabel] = useState('AddList')


 const formHandler = (evnt) => {
 const { name, value } = evnt.target
 setFileds({ ...addFileds, [name]: value })
 if (value) {
 validation[name] = false
 } else {
 validation[name] = true
}
setValidation({ ...validation })
}

const validateForm = () => {
const emailPatternRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const phonePatternRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
for (let k in addFileds) {
if (!addFileds[k]) {
validation[k] = true
} else {
 validation[k] = false
}
}

const email = addFileds['email'];
if (!emailPatternRegex.test(email)) {
validation['email'] = true
}
    const phone = addFileds['phone'];
    if (!phonePatternRegex.test(phone)) {
    validation['phone'] = true
    }


    
setValidation({ ...validation })
return Object.values(validation).some(e => e);
}

const addListToTable = () => {
      // emailPatternRegex.test(value)
if (!validateForm()) {
if (addFileds.userId) {
let editLst = [...list];
editLst.forEach((el, i) => {
if (el.userId == addFileds.userId) {
list[i] = addFileds
 }
 })
} else {
const rndInt = Math.floor(Math.random() * 10000) * 10
list.push({ ...addFileds, userId: rndInt })
}
setList([...list])
setFileds({ firstName: '', lastName: '', phone: '', email: '', })
setButtonLabel('AddList')
}

}

const EditUser = (obj) => {
setButtonLabel('EditSave')
setFileds(obj)
}
const DeleteUsers = (obj) => {
let newList = [...list];
newList = newList.filter(el => el.userId!= obj.userId);
setList([...newList])
}
                                                                  
return (
<div>

<table id="users">
<thead>
<th>SNO</th>
<th>UserId</th>
<th>FirstName</th>
<th>LastName</th>
<th>Emalil</th>
<th>Phone</th>
<th>Actions</th>
    
</thead>
<tbody>
{list.map((el, id) => (
<tr>
<td>{id + 1}</td>
<td>{el.userId}</td>
<td>{el.firstName}</td>
<td>{el.lastName}</td>
<td>{el.phone}</td>
<td>{el.email}</td>
<td>
<button onClick={() => EditUser(el)}>Edit</button>
<button onClick={() => DeleteUsers(el)}>Delete</button>
</td>
</tr>
))}
    
</tbody>
</table>
<div className="continer-form">
<div className="forms">
<label for="">FirstName *</label>
<input name="firstName" value={addFileds.firstName} onChange={formHandler} />
{validation.firstName && <spna className='span-f'>FirstName required!!</spna>}
</div>
<div className="forms">
<label for="">LastName *</label>
<input name="lastName" value={addFileds.lastName} onChange={formHandler} />
{validation.lastName && <spna className='span-f'>LastName required!!</spna>}
</div>
<div className="forms">
<label for="phone">Pone *</label>
<input name="phone" value={addFileds.phone} onChange={formHandler} />
{validation.phone && <spna className='span-f'>Phone number required!!</spna>}
</div>
<div className="forms">
<label for="">Email *</label>
<input name="email" value={addFileds.email} onChange={formHandler} />
{validation.email && <spna className='span-f'>Enter valid email address!!</spna>}
</div>
<button onClick={addListToTable}>{buttonLable}</button>
</div>
</div>
 )
}
export default ToDo;