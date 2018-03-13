class AddChatidBotidToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :chat_id, :string
    add_column :items, :bot_id, :string
  end
end
