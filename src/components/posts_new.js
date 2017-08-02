import React ,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

  renderField(field){
    const {meta:{touched,error}}=field; //destructuring with {meta}=field we can shrink field.meta. to meta. and the meta:{touched,error} we pull the touched and error property from meta
    const className=`form-group ${touched&&error?'has-danger':''}`;
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
        {touched ? error: ''}
        </div>
         {/* shows possible erros from validation. To show the correct error, error.property in validate function must match the name in Field component */}
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values,()=>{            //we pass a callback function to creaPost that we want to call after the post has been created
      this.props.history.push('/');          //this property is passed through the Route component and programmatically redirects to a specific path

    });
  }

  render() {
    const {handleSubmit}=this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title For Post"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  //values -> {title:"",categories:"",content:""}
  const errors={};

  //validate the input from 'values'
  if (!values.title){
    errors.title="Enter a title!"
  }
  if (!values.categories){
    errors.categories="Enter some categories!"
  }
  if (!values.content){
    errors.content="Enter some content please!"
  }
  //if errors is empty the form is fine to submit
  //if errors has any properties redux form assumes from is invalid
  return errors;
}

export default reduxForm({
  validate,                  //validate:validate
  form:'PostsNewForm'
})(                           //this is how we stack two helpers connect returns a react component that can be used as a property in reduxForm helper
  connect(null,{createPost})(PostsNew)
);
