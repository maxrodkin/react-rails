var ActiveItem= React.createClass({
    handleUpdate() {
		//debugger;
        //var description = this.refs.description.value;
        /*$.ajax({
            url: '/api/v1/items',
            type: 'POST',
            data: { item: { id: this.props.activeItem.id, name: this.props.activeItem.name, description: this.refs.description.value } , action:'update'},
            success: () => {this.props.handleUpdate(this.props.activeItem,description);},
			error: function(xhr, status, error) {alert(xhr.responseText);}
        });*/
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
