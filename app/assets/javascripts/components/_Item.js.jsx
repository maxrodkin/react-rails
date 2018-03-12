var Item = React.createClass({
    getInitialState() {
        return {editable: false}
    },
    handleEdit() {
        if(this.state.editable) {
            var name = this.refs.name.value;
            var id = this.props.item.id;
            var description = this.refs.description.value;
            var item = {id: id , name: name , description: description};
            this.props.handleUpdate(item);

        }
        this.setState({ editable: !this.state.editable })
    },
    handleClick(id) {
		debugger;
		console.log('clicked '+id);
		this.props.handleClick(id);
    },

    render() {
        var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.item.name} /> : <div>{this.props.item.name}</div>;
        var description = this.state.editable ? <input type='text' ref='description' defaultValue={this.props.item.description} />: <p>{this.props.item.description}</p>;
		var id_name = this.props.item.id + '/' + this.props.item.name;
        return (
            <div>
			<div onClick={this.props.handleClick} >
                {id_name}
                {/*description*/}
			</div>
			<div>	
					<button onClick={this.props.handleDelete} >Delete</button>
					<button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button>{/**/}{/**/}
            </div>
            </div>
        )
    }
});