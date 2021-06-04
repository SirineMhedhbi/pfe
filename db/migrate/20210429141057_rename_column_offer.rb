class RenameColumnOffer < ActiveRecord::Migration[6.1]
  def change
    rename_column :offers, :name, :company_name
    rename_column :offers, :offer_type, :description
    rename_column :offers, :job_qualification, :job_time

  end
end
