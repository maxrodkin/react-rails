class Api::V2::ItemsController < Api::V1::BaseController
  def index
    respond_with Item.all
  end

  def create
    respond_with :api, :v2, Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
	@item = Item.find_by(chat_id:item_params["chat_id"])
#	rescue ActiveRecord::RecordNotFound
#	if @item.blank?
#	redirect_to (create) 
#	return
#	else
	return redirect_to (create) if @item.blank?
	puts @item
#	@item.update_attributes(item_params)
	@item.description = @item.description + "\n" +  item_params["description"]
	@item.save
	print item_params
    respond_with @item, json: @item
#	end
end

  private

  def item_params
    params.require(:item).permit(:id, :name, :description, :chat_id, :bot_id)
  end
end