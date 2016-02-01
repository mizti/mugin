class CompanyController < ApplicationController
  def index
  end

  def search
  end

  def show
    if params[:ticker] == '1111'
      # rails4
      #@company = Company.find_by(:ticker => '1111')
      # rails3
      @company = Company.where(ticker: params[:ticker]).first
    elsif params[:ticker] == '2222'
      # rails4
      #@company = Company.find_by(:ticker => '1111')
      # rails3
      @company = Company.find(params[:ticker]).first
    end
  end
end
