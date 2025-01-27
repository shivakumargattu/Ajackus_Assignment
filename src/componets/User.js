import React from 'react'

const User = () => {
  return (
    <div>
     <div className="container">
        <div className="card">
            <div className="card-title">
                <h2>Employee Listing </h2>

            </div>
            <div className="card-body">

                <table className="table table-boarder">
                      <thead className="bg-dark text-white">
                       <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>phone</td>
                        <td>Role</td>
                       </tr>
                      </thead>
                </table>
            </div>
        </div>
     </div>
    </div>
  )
}

export default User