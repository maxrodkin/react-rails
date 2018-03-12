var ActiveItem= React.createClass({
    handleUpdate() {
		debugger;
        var description = this.refs.description.value;
        $.ajax({
            url: '/api/v1/items',
            type: 'POST',
            data: { item: { name: name, description: description } , action:'update'},
            success: (item) => {
                this.props.handleUpdate(this.props.activeItem,description);
            }
        });
    },

	
itemIsActive () { return typeof(this.props.activeItem)!='undefined'; } ,

    render() {
		var messages = this.itemIsActive() && <ul>{this.props.activeItem.description.split('\n').map((item) => {return <li>{item}</li>})}</ul>;
        return (
                <div  >
					{this.itemIsActive() &&
							<div id={this.props.activeItem.id}>Чат с {this.props.activeItem.name}:<br></br>
								<div >{messages}<br></br></div>
								Добавьте комментарий<br></br>
							<input ref='description' placeholder='Добавьте комментарий' />
							<button onClick={this.handleUpdate}>Update</button></div>
					}
                </div>

        )
    }
});
