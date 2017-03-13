var Employees = React.createClass({

  getInitialState(){
    return {
      employees: this.props.employees,
      employee: {
        name: "",
        email: "",
        manager: false
      },
      errors: {}
    }
  },

  handleHireEmployee(){
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        employee: this.state.employee
      },
      url: '/employees.json',
      success: function(res){
        var newEmployeeList = that.state.employees;
        that.setState({
          employees: newEmployeeList,
          employee: {
            name: "",
            email: "",
            manager: false
          },
          errors: {}
        });
      },
      error: function(){
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleNameChange(e){
    var newEmployee = this.state.employee;
    newEmployee.name = e.target.value;
    this.setState({employee: newEmployee});
  }

  handleEmailChange(e){
    var newEmployee = this.state.employee;
    newEmployee.email = e.target.value;
    this.setState({employee: newEmployee});
  }

  handleManagerChange(e){
    var newEmployee = this.state.employee;
    newEmployee.manager = e.target.value;
    this.setState({employee: newEmployee});
  }

  render(){
    employees = this.state.employees.map(function(employee){
      return (
        <Employee employee={employee} key={employee.id}/>
      );
    });

    return(
      <div>
        <h1>Employees</h1>
        <div id="employees">
          <table>
            <thead>
              <tr>
                <tr>Name</tr>
                <tr>Email</tr>
                <tr>Manager</tr>
              </tr>
            </thead>
            <tbody>
              {employees}
              <tr>
                <td>
                  <input type="text" onChange={this.handleNameChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input type="text" onChange={this.handleEmailChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.email}</span>
                </td>
                <td>
                  <input type="checkbox" onChange={this.handleManagerChange}/>
                </td>
                <td><button onClick={this.handleHireEmployee}>Hire</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }
});
