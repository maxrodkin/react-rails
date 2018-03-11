var ActiveItem= React.createClass({
    handleClick() {
		debugger;
        var name    = this.props.activeItem.name;
        var description = this.props.activeItem.description;
        $.ajax({
            url: '/api/v1/items',
            type: 'POST',
            data: { item: { name: name, description: description } , action:'update'},
            success: (item) => {
                this.props.handleSubmit(item);
            }
        });
    },	
    render() {
        return (
                <div id={this.name} >
					<textarea rows="4" cols="50" defaultValue={this.props.description}></textarea>
					<br></br>
                    <input ref='description' placeholder='Добавьте комментарий' />
                    <button onClick={this.handleClick}>Submit</button>
                </div>

        )
    }
});
