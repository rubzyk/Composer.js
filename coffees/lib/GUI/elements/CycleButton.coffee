define [], ()->

  if typeof global != "undefined" && global != null 
    root= global.AC.GUI
  else
    root= window.AC.GUI 

  class root.CycleButton
  
    constructor: (opt) ->
  
      if opt.mother
        @mother = $(opt.mother) 
      else
        @mother = $(opt) 
  
      if opt.values then @values = opt.values else @values = opt.items
  
      @mother.addClass('cycle-box')
  
      if opt.items 
        for item,i in opt.items
          do () =>
            if opt.colors 
              @mother.append("<p #{if opt.current == i then 'class=current' else ''} style=\"background: #{opt.colors[i]}\">#{item}</p>") 
            else
              @mother.append("<p>#{item}</p>") 
  
      @items = @mother.find('p')
  
      @mother.css('width', opt.width) if opt.width
      @items.css('borderColor', opt.border_color) if opt.border_color
  
      @items.hide()
  
      @current = @mother.find('.current')
      current_index = 0
      @items.each (index) ->
  
        current_index= index if $(this).hasClass('current')
      
  
      @current_index = current_index
      @current.show()
  
      @mother.click () =>
        #console.log "clic"
        @current.hide()
        @current.removeClass('current')
        if @current.next('p').length > 0
          @current = @current.next('p')
          @current.addClass('current')
          @current_index++
        else 
          @current = @items.first()
          @current.addClass('current')
          @current_index = 0
        @current.show()
  
  
    get_val: ->
      if @values then @values[@current_index] else this.get_text()
  
    set_val: (val)->
      @current.hide()
      @current.removeClass('current')
      @current_index = @values.indexOf(val)
      @current = $(@items[@current_index])
      @current.addClass('current')
      @current.show()
  
    get_text: ->
      @current.text().trim()  
     