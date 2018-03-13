var ActiveItem= React.createClass({
    handleUpdate() {
        this.props.handleUpdate(this.props.activeItem,this.props.activeItem.description+"\n"+ this.refs.description.value);
    },

	
itemIsActive () { return typeof(this.props.activeItem)!='undefined'; } ,

    render() {
		var messages = this.itemIsActive() && <ul>{this.props.activeItem.description.split('\n').map((item) => {return <li>{item}</li>})}</ul>;
        return (
                <div  >
					{this.itemIsActive() &&
							<div id={this.props.activeItem.id}>Чат с {this.props.activeItem.name}:<br></br>
								<div >{messages}</div>
								Добавьте комментарий<br></br>
							<input ref='description' placeholder='Добавьте комментарий' />
							<button onClick={this.handleUpdate}>Update</button></div>
					}
                </div>

        )
    }
});
