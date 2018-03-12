var ActiveItem= React.createClass({
    handleSubmit() {
		//debugger;
        var name    = this.props.activeItem.name;
        var description = this.props.activeItem.description;
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
        return (
                <div id={this.name} >
					{this.itemIsActive() &&
							<div>Чат с {this.props.activeItem.name}<br></br>
								{this.props.activeItem.description}<br></br>
								Добавьте комментарий<br></br>
							<input ref='description' placeholder='Добавьте комментарий' />
							<button onClick={this.handleSubmit}>Submit</button></div>
					}
                </div>

        )
    }
});
